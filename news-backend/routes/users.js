const express = require('express');
const router = express.Router();
//const bcrypt = require('bcryptjs');
const User = require('../models/User');

// 🔹 Save or update user interests
router.post('/interests', async (req, res) => {
  const { email, interests } = req.body;

  try {
    const user = await User.findOneAndUpdate(
      { email },
      { $set: { interests } },
      { upsert: true, new: true }
    );
    res.json(user);
  } catch (err) {
    console.error('Interests update error:', err.message);
    res.status(500).json({ error: 'Failed to save interests' });
  }
});

// 🔹 Register new user
router.post('/register', async (req, res) => {
  const { name, email, password, role, categories } = req.body;

  if (!name || !email || !password || !role || categories.length === 0) {
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
    });

    await newUser.save();
    res.status(201).json({ message: 'User registered successfully.' });
  } catch (err) {
    console.error('Registration error:', err);
    res.status(500).json({ error: 'Server error during registration.' });
  }
});

module.exports = router;
