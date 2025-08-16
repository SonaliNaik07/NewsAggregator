const Article = require('../models/Article');
const axios = require('axios');
const { JSDOM } = require('jsdom');
const { Readability } = require('@mozilla/readability');

// 🔹 Fetch articles from MongoDB
const getArticles = async (req, res) => {
  try {
    const articles = await Article.find().sort({ createdAt: -1 });
    res.json(articles);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch articles' });
  }
};

// 🔹 Dummy AI summarizer (replace with real API later)
const summarizeWithAI = async (text) => {
  return text.slice(0, 200) + '...'; // Truncate for now
};

// 🔹 Summarize external article and optionally save to DB
const summarizeArticle = async (req, res) => {
  const { url, save } = req.body; // Optional `save` flag
  try {
    const html = await axios.get(url);
    const dom = new JSDOM(html.data, { url });
    const reader = new Readability(dom.window.document);
    const article = reader.parse();
    const summary = await summarizeWithAI(article?.textContent || '');

    if (save) {
      const newArticle = new Article({
        title: article?.title || 'Untitled',
        url,
        summary,
      });
      await newArticle.save();
    }

    res.json({ summary });
  } catch (err) {
    console.error('Summarization error:', err);
    res.status(500).json({ error: 'Failed to summarize article' });
  }
};

module.exports = {
  getArticles,
  summarizeArticle,
};
