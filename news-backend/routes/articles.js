const express = require('express');
const router = express.Router();
const { getArticles, summarizeArticle } = require('../controllers/articlesController');
const Article = require('../models/Article');

// 🔹 Create a new article manually
router.post('/', async (req, res) => {
  try {
    const article = new Article(req.body);
    await article.save();
    res.status(201).json(article);
  } catch (err) {
    console.error('Article creation error:', err.message);
    res.status(400).json({ error: err.message });
  }
});

// 🔹 Get all articles
router.get('/', getArticles);

// 🔹 Summarize external article
router.post('/summarize', summarizeArticle);

module.exports = router;
