const express = require('express');
const Content = require('../models/Content');

const router = express.Router();

// List all published content
router.get('/', async (req, res) => {
  try {
    const { type, category, search } = req.query;
    const items = await Content.findAll({
      isPublished: true,
      ...(type     && { type }),
      ...(category && { category }),
      ...(search   && { search }),
    });
    res.json(items);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get single published content
router.get('/:id', async (req, res) => {
  try {
    const item = await Content.findById(req.params.id);
    if (!item || !item.isPublished) {
      return res.status(404).json({ message: 'Content not found' });
    }
    res.json(item);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
