const cron = require('node-cron');
const { notifyUsers } = require('../controllers/notificationController');

cron.schedule('0 8 * * *', () => {
  console.log("Running daily news notification...");
  notifyUsers();
});
