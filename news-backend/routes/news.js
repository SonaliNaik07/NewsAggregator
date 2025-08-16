const express = require('express');
const router = express.Router();
const axios = require('axios');

router.post('/personalized', async (req, res) => {
  const { interests } = req.body;

  try {
    const allNews = await Promise.all(interests.map(async (topic) => {
      const response = await axios.get(`https://newsapi.org/v2/everything?q=${topic}&apiKey=fde901c97416462896c9dbad77cb93ac`);
      return response.data.articles;
    }));

    const merged = allNews.flat();
    res.json(merged);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch personalized news' });
  }
});

module.exports = router;
