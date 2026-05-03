const db = require('../db');

// Maps a MySQL row → API shape (id → _id, so frontend needs no changes)
function toApi(row) {
  if (!row) return null;
  const { id, ...rest } = row;
  return { _id: String(id), ...rest };
}

const Content = {
  // ── Queries ────────────────────────────────────────────

  async findAll(filter = {}) {
    let sql = 'SELECT * FROM content WHERE 1=1';
    const params = [];

    if (filter.isPublished !== undefined) {
      sql += ' AND isPublished = ?';
      params.push(filter.isPublished ? 1 : 0);
    }
    if (filter.type) {
      sql += ' AND type = ?';
      params.push(filter.type);
    }
    if (filter.category) {
      sql += ' AND category LIKE ?';
      params.push(`%${filter.category}%`);
    }
    if (filter.search) {
      sql += ' AND (title LIKE ? OR description LIKE ? OR category LIKE ?)';
      params.push(`%${filter.search}%`, `%${filter.search}%`, `%${filter.search}%`);
    }

    sql += ' ORDER BY createdAt DESC';
    const [rows] = await db.query(sql, params);
    return rows.map(toApi);
  },

  async findById(id) {
    const [rows] = await db.query('SELECT * FROM content WHERE id = ?', [id]);
    return toApi(rows[0] || null);
  },

  async create(data) {
    const { title, description, thumbnail, videoUrl, type, category, season, episode, isPublished } = data;
    const [result] = await db.query(
      `INSERT INTO content (title, description, thumbnail, videoUrl, type, category, season, episode, isPublished)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [title, description, thumbnail, videoUrl, type, category, season ?? null, episode ?? null, isPublished ? 1 : 0]
    );
    return this.findById(result.insertId);
  },

  async update(id, data) {
    const allowed = ['title', 'description', 'thumbnail', 'videoUrl', 'type', 'category', 'season', 'episode', 'isPublished'];
    const fields  = [];
    const params  = [];

    for (const key of allowed) {
      if (data[key] !== undefined) {
        fields.push(`${key} = ?`);
        params.push(key === 'isPublished' ? (data[key] ? 1 : 0) : (data[key] ?? null));
      }
    }

    if (fields.length === 0) return this.findById(id);
    params.push(id);
    await db.query(`UPDATE content SET ${fields.join(', ')} WHERE id = ?`, params);
    return this.findById(id);
  },

  async togglePublish(id) {
    await db.query('UPDATE content SET isPublished = NOT isPublished WHERE id = ?', [id]);
    return this.findById(id);
  },

  async delete(id) {
    const [result] = await db.query('DELETE FROM content WHERE id = ?', [id]);
    return result.affectedRows > 0;
  },

  async count(filter = {}) {
    let sql = 'SELECT COUNT(*) AS n FROM content WHERE 1=1';
    const params = [];
    if (filter.isPublished !== undefined) { sql += ' AND isPublished = ?'; params.push(filter.isPublished ? 1 : 0); }
    if (filter.type)                       { sql += ' AND type = ?';        params.push(filter.type); }
    const [rows] = await db.query(sql, params);
    return rows[0].n;
  },
};

module.exports = Content;
