const express = require('express');
const router = express.Router();

const {
  getArticles,
  summarizeArticle,
  getPersonalizedNews,
  saveArticleToUser,
} = require('../controllers/articlesController');

// 📥 Fetch all articles
router.get('/', getArticles);

// 🧠 Summarize a specific article
router.post('/summarize', summarizeArticle);

// 🎯 Get personalized news for a user
router.post('/personalized', getPersonalizedNews);

// 💾 Save an article to a user's profile
router.post('/users/:userId/save', saveArticleToUser);

module.exports = router;
