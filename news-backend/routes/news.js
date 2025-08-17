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
    console.error('News fetch error:', err.message);
    res.status(500).json({ error: 'Failed to fetch personalized news' });
  }
});


router.post('/summarize', authenticateToken, async (req, res) => {
  const { url } = req.body;

  try {
    const response = await axios.post('https://api.openai.com/v1/chat/completions', {
      model: 'gpt-3.5-turbo',
      messages: [
        { role: 'system', content: 'Summarize this news article in 5 bullet points.' },
        { role: 'user', content: `URL: ${url}` },
      ],
    }, {
      headers: {
        Authorization: `Bearer YOUR_OPENAI_API_KEY`,
      },
    });

    const summary = response.data.choices[0].message.content;
    res.json({ summary });
  } catch (err) {
    console.error('Summarization error:', err);
    res.status(500).json({ error: 'Failed to summarize article.' });
  }
});


module.exports = router;
