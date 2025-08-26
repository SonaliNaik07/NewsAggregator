const bcrypt = require('bcryptjs');
const User = require('../models/User');

const register= async (req, res) => {
  // ✅ Added defensive check to prevent destructuring crash
  if (!req.body) {
    return res.status(400).json({ error: 'Missing request body.' });
  }

const { name, email, password, role, categories } = req.body || {};

  if (!name || !email || !password || !role) {
    return res.status(400).json({ error: 'All fields are required.' });
  }

  if (role !== 'Admin' && (!Array.isArray(categories) || categories.length === 0)) {
    return res.status(400).json({ error: 'Please select at least one category.' });
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
      categories: role === 'Admin' ? [] : categories,
      interests: role === 'Admin' ? [] : categories,
    });

    await newUser.save();
    return res.status(201).json({ message: 'User registered successfully.' });
  } catch (err) {
    console.error('Registration error:', err);
    return res.status(500).json({ error: err.message || 'Internal server error.' });
  }
};


const getAllUsers = async (req, res) => {
  const users = await User.find({}); // No filtering
  res.status(200).json(users);
};

//controll user edits
const updateUser = async (req, res) => {
  const { name, email, role, categories, status } = req.body;

  if (!name || !email || !role) {
    return res.status(400).json({ message: 'Missing required fields.' });
  }

  if (role !== 'Admin' && (!categories || categories.length === 0)) {
    return res.status(400).json({ message: 'Non-admin users must have at least one category.' });
  }

  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { name, email, role, categories, status },
      { new: true, runValidators: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found.' });
    }

    res.json(updatedUser);
  } catch (err) {
    console.error('Update error:', err.message);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  register,
  getAllUsers,
  updateUser,
};

