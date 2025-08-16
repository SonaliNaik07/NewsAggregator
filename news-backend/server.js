// server.js
const express = require('express');
const cors = require('cors');
require('dotenv').config();
require('./db/connection'); // ✅ MongoDB connection

const articleRoutes = require('./routes/articles');
const summarizeRoute = require('./routes/summarizeRoute');
const userRoutes = require('./routes/users'); // ✅ includes register/login/interests

const app = express();
app.use(cors());
app.use(express.json());

// ✅ Route setup
app.use('/api/articles', articleRoutes);
app.use('/api/summarize', summarizeRoute);
app.use('/api/users', userRoutes); // 👈 includes /register and /interests

// ✅ Server start
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
