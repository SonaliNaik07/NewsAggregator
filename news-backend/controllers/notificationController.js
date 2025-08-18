const User = require('../models/User');
const { fetchArticles } = require('../services/newsService');
const { sendEmail } = require('../services/emailService');

async function notifyUsers() {
  const users = await User.find();

  for (const user of users) {
    const articles = await fetchArticles(user.categories, user.lastNotified);
    if (articles.length > 0) {
      await sendEmail(user.email, articles);
      user.lastNotified = new Date();
      await user.save();
    }
  }
}

module.exports = { notifyUsers };
