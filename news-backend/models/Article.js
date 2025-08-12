const mongoose = require('mongoose');

const articleSchema = new mongoose.Schema({
  title: { type: String, required: true },
  snippet: String,
  category: String,
  published_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Article', articleSchema);
