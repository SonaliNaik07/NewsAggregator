const db = require('../db/connection');

const getArticles = async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM articles ORDER BY published_at DESC');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch articles' });
  }
};

module.exports = { getArticles };
