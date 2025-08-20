const articleController = require('../controllers/articlesController');

const express = require('express');
const router = express.Router();
const {
  getArticles,
  summarizeArticle,
  getPersonalizedNews,
  saveArticleToUser,
  
} = require('../controllers/articlesController');

// Existing routes...
router.get('/', getArticles);
router.post('/summarize', summarizeArticle);
router.post('/personalized', getPersonalizedNews);

// ✅ New route to save article to user
router.post('/users/:userId/save', saveArticleToUser);
module.exports = router;
