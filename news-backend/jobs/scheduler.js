const cron = require('node-cron');
const { notifyUsers } = require('../controllers/notificationController');

cron.schedule('0 8 * * *', async () => {
  console.log('📬 Running daily notification job...');
  try {
    await notifyUsers();
    console.log('✅ Notifications sent successfully');
  } catch (err) {
    console.error('❌ Notification error:', err.message);
  }
});
