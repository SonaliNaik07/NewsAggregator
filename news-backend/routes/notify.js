const express = require('express');
const router = express.Router();
const { notifyUsers } = require('../controllers/notificationController');

router.get('/trigger', async (req, res) => {
  try {
    await notifyUsers();
    res.send('✅ Notification triggered');
  } catch (err) {
    res.status(500).send('❌ Failed to send notifications');
  }
});

module.exports = router;
