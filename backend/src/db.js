require('dotenv').config();
const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  host:               process.env.DB_HOST     || 'localhost',
  port:               Number(process.env.DB_PORT) || 3306,
  user:               process.env.DB_USER     || 'root',
  password:           process.env.DB_PASSWORD || '',
  database:           process.env.DB_NAME     || 'iwacuflix',
  waitForConnections: true,
  connectionLimit:    10,
  decimalNumbers:     true,
  // Convert tinyint(1) → JS boolean automatically
  typeCast: (field, next) => {
    if (field.type === 'TINY' && field.length === 1) return field.string() === '1';
    return next();
  },
});

module.exports = pool;
