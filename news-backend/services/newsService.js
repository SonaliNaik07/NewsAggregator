const axios = require('axios');

async function fetchArticles(categories, lastNotified) {
  const allArticles = [];

  for (const category of categories) {
    const res = await axios.get(`https://newsapi.org/v2/top-headlines`, {
      params: {
        category,
        apiKey: process.env.NEWS_API_KEY,
        from: lastNotified
      }
    });
    allArticles.push(...res.data.articles);
  }

  return allArticles;
}

module.exports = { fetchArticles };
