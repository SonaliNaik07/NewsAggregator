const mongoose = require('mongoose');

const articleSchema = new mongoose.Schema({
  title: String,
  url: String,
  summary: String,
}, { timestamps: true });

module.exports = mongoose.model('Article', articleSchema);
