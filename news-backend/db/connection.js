const mysql = require('mysql2');
require('dotenv').config();

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
});

pool.getConnection((err, connection) => {
  if (err) {
    console.error('MySQL connection failed:', err.message);
  } else {
    console.log('MySQL connected');
    connection.release();
  }
});

module.exports = pool.promise();
