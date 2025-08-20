// server.js
require('dotenv').config();
require('./db/connection'); // ✅ MongoDB connection
require('./jobs/scheduler');

const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const cron = require('node-cron');
const { notifyUsers } = require('./controllers/notificationController'); // ✅ Notification logic

const articleRoutes = require('./routes/articles');
const summarizeRoute = require('./routes/summarizeRoute');
const userRoutes = require('./routes/users');
const notifyRoutes = require('./routes/notify');

const app = express();

// ✅ Middleware setup
app.use(cors());
app.use(helmet()); // 👈 Security headers
app.use(express.json());

// ✅ Route setup
app.use('/api/articles', articleRoutes);
app.use('/api/summarize', summarizeRoute);
app.use('/api/users', userRoutes);
app.use('/api/notify', notifyRoutes);

// ✅ Server start
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});

// ✅ Scheduled Notification Job (runs daily at 8 AM)
cron.schedule('0 8 * * *', async () => {
  console.log('📬 Running daily notification job...');
  try {
    await notifyUsers();
    console.log('✅ Notifications sent successfully');
  } catch (err) {
    console.error('❌ Notification error:', err.message);
  }
});
