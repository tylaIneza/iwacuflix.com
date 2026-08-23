require('dotenv').config();
const express    = require('express');
const cors       = require('cors');
const path       = require('path');
const mysql      = require('mysql2/promise');

const authRoutes    = require('./routes/auth');
const contentRoutes = require('./routes/content');
const adminRoutes   = require('./routes/admin');
const contactRoutes = require('./routes/contact');
const requireAuth   = require('./middleware/auth');

const app = express();

app.use(cors({ origin: process.env.FRONTEND_URL || 'http://localhost:3000', credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

app.use('/api/auth',    authRoutes);
app.use('/api/content', contentRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/admin',   requireAuth, adminRoutes);
app.get('/api/health',  (req, res) => res.json({ status: 'ok', service: 'Iwacuflix API (MySQL)' }));

// ── Bootstrap ─────────────────────────────────────────────
async function bootstrap() {
  const cfg = {
    host:     process.env.DB_HOST     || 'localhost',
    port:     Number(process.env.DB_PORT) || 3306,
    user:     process.env.DB_USER     || 'root',
    password: process.env.DB_PASSWORD || '',
  };

  // 1. Create the database if it doesn't exist yet
  const raw = await mysql.createConnection(cfg);
  const dbName = process.env.DB_NAME || 'iwacuflix';
  await raw.query(`CREATE DATABASE IF NOT EXISTS \`${dbName}\` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci`);
  await raw.end();
  console.log(`✅ Database "${dbName}" ready`);

  // 2. Now the pool (which connects TO the database) can be loaded
  const db = require('./db');
  await db.getConnection().then((c) => { c.release(); });
  console.log('✅ Connected to MySQL (XAMPP)');

  // 3. Create tables
  await db.query(`
    CREATE TABLE IF NOT EXISTS users (
      id        INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
      email     VARCHAR(255) NOT NULL UNIQUE,
      password  VARCHAR(255) NOT NULL,
      role      ENUM('admin') NOT NULL DEFAULT 'admin',
      createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4
  `);

  await db.query(`
    CREATE TABLE IF NOT EXISTS content (
      id          INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
      title       VARCHAR(255) NOT NULL,
      description TEXT         NOT NULL,
      thumbnail   VARCHAR(500) NOT NULL,
      videoUrl    VARCHAR(500) NOT NULL,
      type        ENUM('movie','series') NOT NULL,
      category    VARCHAR(100) NOT NULL,
      season      SMALLINT     NULL,
      episode     SMALLINT     NULL,
      isPublished TINYINT(1)   NOT NULL DEFAULT 0,
      createdAt   TIMESTAMP    DEFAULT CURRENT_TIMESTAMP,
      updatedAt   TIMESTAMP    DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      INDEX idx_published (isPublished),
      INDEX idx_type      (type),
      INDEX idx_category  (category)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4
  `);
  await db.query(`
    CREATE TABLE IF NOT EXISTS messages (
      id          INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
      name        VARCHAR(150) NOT NULL,
      email       VARCHAR(255) NOT NULL,
      subject     VARCHAR(200) NOT NULL,
      message     TEXT         NOT NULL,
      category    ENUM('general','copyright','business') NOT NULL DEFAULT 'general',
      status      ENUM('unread','read') NOT NULL DEFAULT 'unread',
      createdAt   TIMESTAMP    DEFAULT CURRENT_TIMESTAMP,
      updatedAt   TIMESTAMP    DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      INDEX idx_status   (status),
      INDEX idx_category (category)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4
  `);
  console.log('✅ Tables ready');

  // 4. Seed admin user if none exists
  const bcrypt = require('bcryptjs');
  const User   = require('./models/User');
  const exists = await User.findByRole('admin');
  if (!exists) {
    const hash = await bcrypt.hash(process.env.ADMIN_PASSWORD || 'admin123', 12);
    await User.create({ email: process.env.ADMIN_EMAIL || 'admin@iwacuflix.com', password: hash });
    console.log(`👤 Admin created → ${process.env.ADMIN_EMAIL || 'admin@iwacuflix.com'}`);
  }

  // 5. Start server
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => console.log(`🚀 Server → http://localhost:${PORT}`));
}

bootstrap().catch((err) => {
  console.error('\n❌ Startup failed:', err.message);
  console.error('👉 Make sure XAMPP MySQL is running, then retry.\n');
  process.exit(1);
});
