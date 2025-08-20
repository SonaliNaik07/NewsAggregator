const axios = require('axios');
const { JSDOM } = require('jsdom');
const { Readability } = require('@mozilla/readability');
const Article = require('../models/Article');
const User = require('../models/User');

// 🔹 Fetch personalized articles from NewsAPI
const getPersonalizedNews = async (req, res) => {
  const { interests } = req.body;
  const NEWS_API_KEY = process.env.NEWS_API_KEY;

  if (!interests || interests.length === 0) {
    return res.status(400).json({ status: 'error', error: 'No interests provided' });
  }

  try {
    const allArticles = [];

    for (const category of interests) {
      const response = await axios.get('https://newsapi.org/v2/top-headlines', {
        params: {
          category,
          country: 'us',
          apiKey: NEWS_API_KEY,
          pageSize: 7,
        },
      });

      const articles = response.data.articles.map((item) => ({
        title: item.title,
        description: item.description,
        url: item.url,
        urlToImage: item.urlToImage,
        source: {
          name: item.source?.name || 'Unknown',
        },
        publishedAt: item.publishedAt || new Date(),
      }));

      allArticles.push(...articles);
    }

    res.json({ status: 'success', articles: allArticles });
  } catch (err) {
    console.error('📰 News fetch error:', err.message);
    res.status(500).json({ status: 'error', error: 'Failed to fetch personalized news' });
  }
};

// 🔹 Fetch articles from MongoDB
const getArticles = async (req, res) => {
  try {
    const articles = await Article.find().sort({ createdAt: -1 });
    res.json({ status: 'success', articles });
  } catch (err) {
    console.error('📁 Mongo fetch error:', err.message);
    res.status(500).json({ status: 'error', error: 'Failed to fetch articles' });
  }
};

// 🔹 Summarize article and optionally save
const summarizeArticle = async (req, res) => {
  const { url, save } = req.body;

  try {
    const html = await axios.get(url);
    const dom = new JSDOM(html.data, { url });
    const reader = new Readability(dom.window.document);
    const article = reader.parse();
    const summary = article?.textContent?.slice(0, 200) + '...';

    if (save) {
      const newArticle = new Article({
        title: article?.title || 'Untitled',
        url,
        summary,
      });
      await newArticle.save();
    }

    res.json({ status: 'success', summary });
  } catch (err) {
    console.error('📝 Summarization error:', err.message);
    res.status(500).json({ status: 'error', error: 'Failed to summarize article' });
  }
};

// 🔹 Save article to user's saved list
const saveArticleToUser = async (req, res) => {
  const { userId } = req.params;
  const article = req.body;

  console.log('📦 Incoming article:', article);
  console.log('🔍 Looking for user:', userId);

  try {
    const user = await User.findById(userId);
    if (!user) {
      console.warn('⚠️ User not found:', userId);
      return res.status(404).json({ status: 'error', error: 'User not found' });
    }

    const alreadySaved = user.savedNews.some((item) => item.url === article.url);
    if (alreadySaved) {
      console.info('🛑 Duplicate article detected:', article.url);
      return res.status(409).json({ status: 'duplicate' });
    }

    const formattedArticle = {
      title: article.title || 'Untitled',
      description: article.description || '',
      url: article.url,
      urlToImage: article.urlToImage || '',
      source: {
        name: article.source?.name || 'Unknown',
      },
      publishedAt: article.publishedAt || new Date(),
    };

    user.savedNews.push(formattedArticle);
    await user.save();

    console.log('✅ Article saved successfully:', formattedArticle.title);
    return res.status(201).json({
      status: 'saved',
      savedNews: user.savedNews,
    });
  } catch (err) {
    console.error('❌ Save error:', err.message);
    console.error('🧵 Stack trace:', err.stack);
    return res.status(500).json({ status: 'error', error: err.message });
  }
};

module.exports = {
  getArticles,
  summarizeArticle,
  getPersonalizedNews,
  saveArticleToUser,
};
