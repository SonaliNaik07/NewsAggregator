const express = require('express');
const router = express.Router();
const Article = require('../models/Article');

// Create article
router.post('/', async (req, res) => {
  try {
    const article = new Article(req.body);
    await article.save();
    res.status(201).json(article);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get all articles
router.get('/', async (req, res) => {
  const articles = await Article.find();
  res.json(articles);
});

module.exports = router;
