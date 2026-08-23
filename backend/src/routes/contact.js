const express    = require('express');
const rateLimit  = require('express-rate-limit');
const Message    = require('../models/Message');

const router = express.Router();

// ── Spam protection: 5 submissions per IP per 15 minutes ───
const contactLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 5,
  standardHeaders: true,
  legacyHeaders: false,
  message: { message: 'Too many messages sent from this device. Please try again later.' },
});

const EMAIL_RE  = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const CATEGORIES = ['general', 'copyright', 'business'];

// POST /api/contact — public, rate-limited
router.post('/', contactLimiter, async (req, res) => {
  try {
    const { name, email, subject, message, category, website } = req.body;

    // Honeypot field: real users never fill this in (it's hidden via CSS).
    // Bots that auto-fill every field will trip it — pretend success, drop silently.
    if (website) {
      return res.status(201).json({ message: 'Your message has been sent. We will get back to you soon.' });
    }

    const cleanName     = String(name || '').trim();
    const cleanEmail    = String(email || '').trim();
    const cleanSubject  = String(subject || '').trim();
    const cleanMessage  = String(message || '').trim();
    const cleanCategory = CATEGORIES.includes(category) ? category : 'general';

    const errors = {};
    if (cleanName.length < 2 || cleanName.length > 150) {
      errors.name = 'Name must be between 2 and 150 characters.';
    }
    if (!EMAIL_RE.test(cleanEmail) || cleanEmail.length > 255) {
      errors.email = 'Please enter a valid email address.';
    }
    if (cleanSubject.length < 3 || cleanSubject.length > 200) {
      errors.subject = 'Subject must be between 3 and 200 characters.';
    }
    if (cleanMessage.length < 10 || cleanMessage.length > 5000) {
      errors.message = 'Message must be between 10 and 5000 characters.';
    }

    if (Object.keys(errors).length > 0) {
      return res.status(400).json({ message: 'Please correct the errors below.', errors });
    }

    await Message.create({
      name: cleanName, email: cleanEmail, subject: cleanSubject,
      message: cleanMessage, category: cleanCategory,
    });

    res.status(201).json({ message: 'Your message has been sent. We will get back to you soon.' });
  } catch (err) {
    console.error('Contact form error:', err);
    res.status(500).json({ message: 'Server error. Please try again later.' });
  }
});

module.exports = router;
