const db = require('../db');

const User = {
  async findByEmail(email) {
    const [rows] = await db.query('SELECT * FROM users WHERE email = ?', [email.toLowerCase()]);
    return rows[0] || null;
  },

  async findByRole(role) {
    const [rows] = await db.query('SELECT * FROM users WHERE role = ?', [role]);
    return rows[0] || null;
  },

  async create({ email, password, role = 'admin' }) {
    const [result] = await db.query(
      'INSERT INTO users (email, password, role) VALUES (?, ?, ?)',
      [email.toLowerCase(), password, role]
    );
    return { id: result.insertId, email, role };
  },
};

module.exports = User;
