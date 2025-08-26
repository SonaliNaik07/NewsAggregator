const mongoose = require('mongoose');

const savedArticleSchema = new mongoose.Schema({
  title: String,
  description: String,
  url: String,
  urlToImage: String,
  source: {
    name: { type: String, required: true }
  },
  publishedAt: Date,
});

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,

  role: {
    type: String,
    required: true
  },

  categories: {
    type: [String],
    default: [],
    required: function () {
      return this.role !== 'Admin';
    },
  },

  status: {
    type: String,
    enum: ['active', 'inactive'],
    default: 'active'
  },

  interests: {
    type: [String],
    default: [],
  },

  savedNews: {
    type: [savedArticleSchema],
    default: [],
  },

  lastNotified: {
    type: Date,
    default: null,
  }
}, {
  timestamps: true
});


module.exports = mongoose.model('User', userSchema);
