const axios = require('axios');
const User = require('../models/User');
const sendEmail = require('../utils/sendEmail');

const NEWS_API_KEY = process.env.NEWS_API_KEY;

async function checkAndNotifyUsers() {
  const users = await User.find({});

  for (const user of users) {
    const newArticles = [];

    for (const category of user.interests) {
      const res = await axios.get(`https://newsapi.org/v2/top-headlines`, {
        params: {
          category,
          country: 'us',
          apiKey: NEWS_API_KEY,
          pageSize: 5,
        },
      });

      const articles = res.data.articles;

      articles.forEach((article) => {
        const alreadySaved = user.savedNews.some((a) => a.url === article.url);
        if (!alreadySaved) {
          newArticles.push({
            title: article.title,
            description: article.description,
            url: article.url,
            source: article.source?.name || 'Unknown',
            publishedAt: article.publishedAt,
          });
        }
      });
    }

    if (newArticles.length > 0) {
      await sendEmail(user.email, newArticles);
      user.lastNotified = new Date();
      await user.save();
    }
  }
}

module.exports = checkAndNotifyUsers;
