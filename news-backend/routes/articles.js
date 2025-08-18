const express = require('express');
const router = express.Router();
const {
  getArticles,
  summarizeArticle,
  getPersonalizedNews,
} = require('../controllers/articlesController');

// 🔹 Personalized news
router.post('/personalized', getPersonalizedNews);

// 🔹 Get all articles
router.get('/', getArticles);

// 🔹 Summarize external article
router.post('/summarize', summarizeArticle);

module.exports = router;
