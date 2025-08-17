const mongoose = require('mongoose');

const savedArticleSchema = new mongoose.Schema({
  title: String,
  description: String,
  url: String,
  urlToImage: String,
 source: String, // ✅ Must be a string
 publishedAt: String,
});


const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  role: String,
  categories: [String],
  interests: {
    type: [String],
    default: [],
  },
savedNews: {
  type: [savedArticleSchema], // ✅ Use the defined schema
  default: [],
},
}, {
  timestamps: true // 👈 adds createdAt and updatedAt automatically
});

module.exports = mongoose.model('User', userSchema);
