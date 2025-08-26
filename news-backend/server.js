// server.js
require('dotenv').config();
require('./db/connection'); // ✅ MongoDB connection

const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');

const articleRoutes = require('./routes/articles');
const summarizeRoute = require('./routes/summarizeRoute');
const userRoutes = require('./routes/users');
const notifyRoutes = require('./routes/notify');

const app = express();

// ✅ Middleware setup
app.use(express.json());
app.use(cors());
app.use(helmet({ crossOriginResourcePolicy: { policy: "cross-origin" } }));
app.use(morgan('dev')); // Optional: logs HTTP requests

// ✅ Route setup
app.use('/api/users', userRoutes);        // /api/users inside userRoutes
app.use('/api', articleRoutes);     // /api/articles inside articleRoutes
app.use('/api', summarizeRoute);    // /api/summarize inside summarizeRoute
app.use('/api', notifyRoutes);      // /api/notify inside notifyRoutes

// ✅ Global error handler
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err.message);
  res.status(500).json({ error: 'Internal server error' });
});

// ✅ Graceful shutdown
process.on('SIGINT', () => {
  console.log('🛑 Server shutting down...');
  process.exit();
});

// ✅ Server start
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
