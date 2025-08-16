const express = require('express');
const router = express.Router();
const { getArticles, summarizeArticle } = require('../controllers/articlesController');
const Article = require('../models/Article');

// 🔹 Create a new article manually (not from summarizer)
router.post('/', async (req, res) => {
  try {
    const article = new Article(req.body);
    await article.save();
    res.status(201).json(article);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// 🔹 Get all articles from MongoDB
router.get('/', getArticles);

// 🔹 Summarize external article and optionally save
router.post('/summarize', summarizeArticle);

module.exports = router;
