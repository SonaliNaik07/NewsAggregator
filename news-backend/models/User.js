// models/User.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  role: String,
  categories: [String],
  interests: [String], // optional
});

module.exports = mongoose.model('User', userSchema);
