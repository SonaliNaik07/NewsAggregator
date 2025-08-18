// 🔹 Fetch personalized articles from NewsAPI
const getPersonalizedNews = async (req, res) => {
  const { interests } = req.body;
  const NEWS_API_KEY = process.env.NEWS_API_KEY;

  if (!interests || interests.length === 0) {
    return res.status(400).json({ error: 'No interests provided' });
  }

  try {
    const allArticles = [];

    for (const category of interests) {
      const response = await axios.get('https://newsapi.org/v2/top-headlines', {
        params: {
          category,
          country: 'us',
          apiKey: NEWS_API_KEY,
          pageSize: 5,
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
      }));

      allArticles.push(...articles);
    }

    res.json(allArticles);
  } catch (err) {
    console.error('News fetch error:', err.message);
    res.status(500).json({ error: 'Failed to fetch personalized news' });
  }
};

module.exports = {
  getArticles,
  summarizeArticle,
  getPersonalizedNews, // ✅ Add this
};
