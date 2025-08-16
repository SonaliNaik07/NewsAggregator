const express = require('express');
const router = express.Router();

router.post('/', async (req, res) => {
  const { url } = req.body;
  // summarize logic here
  res.json({ summary: 'This is a test summary.' });
});

module.exports = router;
