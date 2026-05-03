const express = require('express');
const path    = require('path');
const multer  = require('multer');
const Content = require('../models/Content');

const router = express.Router();

// ── Multer: thumbnail uploads ──────────────────────────────
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, path.join(__dirname, '../../uploads')),
  filename:    (req, file, cb) => cb(null, `thumb_${Date.now()}${path.extname(file.originalname)}`),
});
const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    if (!file.mimetype.startsWith('image/')) return cb(new Error('Images only'));
    cb(null, true);
  },
});

// Upload thumbnail → return URL
router.post('/upload', upload.single('thumbnail'), (req, res) => {
  if (!req.file) return res.status(400).json({ message: 'No file uploaded' });
  const url = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;
  res.json({ url });
});

// Dashboard stats
router.get('/stats', async (req, res) => {
  try {
    const [total, movies, series, published] = await Promise.all([
      Content.count(),
      Content.count({ type: 'movie' }),
      Content.count({ type: 'series' }),
      Content.count({ isPublished: true }),
    ]);
    res.json({ total, movies, series, published, unpublished: total - published });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// List ALL content (including unpublished)
router.get('/content', async (req, res) => {
  try {
    const { type, search } = req.query;
    const items = await Content.findAll({
      ...(type   && { type }),
      ...(search && { search }),
    });
    res.json(items);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Create content
router.post('/content', async (req, res) => {
  try {
    const required = ['title', 'description', 'thumbnail', 'videoUrl', 'type', 'category'];
    for (const f of required) {
      if (!req.body[f]) return res.status(400).json({ message: `${f} is required` });
    }
    const item = await Content.create(req.body);
    res.status(201).json(item);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update content
router.put('/content/:id', async (req, res) => {
  try {
    const item = await Content.update(req.params.id, req.body);
    if (!item) return res.status(404).json({ message: 'Content not found' });
    res.json(item);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Toggle publish/unpublish
router.put('/content/:id/publish', async (req, res) => {
  try {
    const item = await Content.togglePublish(req.params.id);
    if (!item) return res.status(404).json({ message: 'Content not found' });
    res.json(item);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete content
router.delete('/content/:id', async (req, res) => {
  try {
    const deleted = await Content.delete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Content not found' });
    res.json({ message: 'Deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
