const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// 🔐 JWT Auth Middleware
function authenticateToken(req, res, next) {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'No token provided.' });

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ error: 'Invalid token.' });
    req.user = user;
    next();
  });
}

// 🔹 Register new user
router.post('/register', async (req, res) => {
  const { name, email, password, role, categories } = req.body;

  if (!name || !email || !password || !role || !Array.isArray(categories) || categories.length === 0) {
    return res.status(400).json({ error: 'All fields are required.' });
  }

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ error: 'Email already registered.' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      role,
      categories,
      interests: categories, // Initialize interests with selected categories
    });

    await newUser.save();
    res.status(201).json({ message: 'User registered successfully.' });
  } catch (err) {
    console.error('Registration error:', err);
    res.status(500).json({ error: 'Server error during registration.' });
  }
});

// 🔹 Login user
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
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
    const user = await User.findOneAndUpdate(
      { _id: userId },
      { $set: { interests } },
      { upsert: true, new: true }
    );
    res.json(user);
  } catch (err) {
    console.error('Interests update error:', err.message);
    res.status(500).json({ error: 'Failed to save interests.' });
  }
});

// 🔹 Save user Articles (with transformation)
router.post('/save', authenticateToken, async (req, res) => {
  const userId = req.user.id;
  const article = req.body;

  const transformedArticle = {
    ...article,
    source: article.source?.name || article.source || 'Unknown',
  };

  try {
    const user = await User.findById(userId);

    const alreadySaved = user.savedNews.some(
      (a) => a.url === transformedArticle.url
    );

    if (alreadySaved) {
      return res.status(409).json({ error: 'Article already saved.' });
    }

    await User.findByIdAndUpdate(userId, {
      $push: { savedNews: transformedArticle },
    });

    res.status(200).json({ message: 'Article saved.' });
  } catch (err) {
    console.error('Save error:', err);
    res.status(500).json({ error: 'Failed to save article.' });
  }
});



module.exports = router;
