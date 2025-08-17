const express = require('express');
const router = express.Router();

// 🔹 Summarize external article (placeholder logic)
router.post('/', async (req, res) => {
  const { url } = req.body;

  try {
    // TODO: Add actual summarization logic here
    res.json({ summary: 'This is a test summary.' });
  } catch (err) {
    console.error('Summarization error:', err.message);
    res.status(500).json({ error: 'Failed to summarize article.' });
  }
});

module.exports = router;
