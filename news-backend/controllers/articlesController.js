const User = require('../models/User');

const getArticles = async (req, res) => {
  try {
    res.status(200).json({ message: 'Articles fetched successfully.' });
  } catch (err) {
    console.error('❌ Fetch error:', err.message);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const summarizeArticle = async (req, res) => {
  res.status(200).json({ summary: 'This is a dummy summary.' });
};

const getPersonalizedNews = async (req, res) => {
  res.status(200).json({ articles: [] });
};

const saveArticleToUser = async (req, res) => {
  const { userId } = req.params;
  const article = req.body;

  if (!article.url) {
    console.warn('⚠️ Missing article URL');
    return res.status(400).json({ status: 'error', error: 'Article URL is required' });
  }

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
      title: article.title?.trim() || 'Untitled',
      description: article.description?.trim() || '',
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
    return res.status(500).json({ status: 'error', error: err.message });
  }
};

module.exports = {
  getArticles,
  summarizeArticle,
  getPersonalizedNews,
  saveArticleToUser,
};
