const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Article = require('../models/Article');
const { saveArticleToUser } = require('../controllers/articlesController');
const { register, getAllUsers, updateUser } = require('../controllers/userController');

// 🔐 JWT Auth Middleware
function authenticateToken(req, res, next) {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'No token provided.' });

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ error: 'Invalid token.' });
    req.user = { id: user.id || user._id };
    next();
  });
}

// 🔹 Register new user (delegated to controller)
router.post('/register', register);

// 🔹 Login user
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ error: 'User not found.' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ error: 'Invalid credentials.' });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
    res.status(200).json({ message: 'Login successful', token, user });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ error: 'Server error during login.' });
  }
});

// 🔹 Save or update user interests
router.post('/interests', authenticateToken, async (req, res) => {
  const { interests } = req.body;
  const userId = req.user.id;

  try {
    const user = await User.findByIdAndUpdate(
      userId,
      { $set: { interests } },
      { new: true }
    );
    res.json(user);
  } catch (err) {
    console.error('Interests update error:', err.message);
    res.status(500).json({ error: 'Failed to save interests.' });
  }
});

// 🔹 Save article to user's saved list
router.post('/users/:userId/save', saveArticleToUser);

// 🔹 Save article to global Article collection
router.post('/saveArticle', async (req, res) => {
  const { title, description, url, urlToImage, publishedAt, source } = req.body;

  try {
    const existing = await Article.findOne({ url });
    if (existing) return res.status(409).json({ message: 'Already saved' });

    const newArticle = new Article({ title, description, url, urlToImage, publishedAt, source });
    await newArticle.save();

    res.status(201).json({ message: 'Article saved successfully' });
  } catch (err) {
    console.error('Save error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

//delete user 
router.delete('/:id', async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    if (!deletedUser) return res.status(404).json({ error: 'User not found' });
    res.json({ message: 'User deleted successfully' });
  } catch (err) {
    console.error('Delete error:', err.message);
    res.status(500).json({ error: 'Server error during deletion' });
  }
});

router.put('/users/:id', updateUser);

router.get('/', getAllUsers); // ✅ This handles GET /api/users
module.exports = router;
