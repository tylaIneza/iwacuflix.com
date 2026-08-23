const db = require('../db');

// Maps a MySQL row → API shape (id → _id, matches Content.js convention)
function toApi(row) {
  if (!row) return null;
  const { id, ...rest } = row;
  return { _id: String(id), ...rest };
}

const Message = {
  async create({ name, email, subject, message, category = 'general' }) {
    const [result] = await db.query(
      `INSERT INTO messages (name, email, subject, message, category) VALUES (?, ?, ?, ?, ?)`,
      [name, email, subject, message, category]
    );
    return this.findById(result.insertId);
  },

  async findAll(filter = {}) {
    let sql = 'SELECT * FROM messages WHERE 1=1';
    const params = [];

    if (filter.status) {
      sql += ' AND status = ?';
      params.push(filter.status);
    }
    if (filter.category) {
      sql += ' AND category = ?';
      params.push(filter.category);
    }
    if (filter.search) {
      sql += ' AND (name LIKE ? OR email LIKE ? OR subject LIKE ? OR message LIKE ?)';
      const s = `%${filter.search}%`;
      params.push(s, s, s, s);
    }

    sql += ' ORDER BY createdAt DESC';
    const [rows] = await db.query(sql, params);
    return rows.map(toApi);
  },

  async findById(id) {
    const [rows] = await db.query('SELECT * FROM messages WHERE id = ?', [id]);
    return toApi(rows[0] || null);
  },

  async setStatus(id, status) {
    await db.query('UPDATE messages SET status = ? WHERE id = ?', [status, id]);
    return this.findById(id);
  },

  async delete(id) {
    const [result] = await db.query('DELETE FROM messages WHERE id = ?', [id]);
    return result.affectedRows > 0;
  },

  async countUnread() {
    const [rows] = await db.query("SELECT COUNT(*) AS n FROM messages WHERE status = 'unread'");
    return rows[0].n;
  },
};

module.exports = Message;
