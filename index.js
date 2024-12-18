const express = require('express');
const app = express();
const { Pool } = require('pg');  // PostgreSQL client for Node.js
const port = process.env.PORT || 3000;

// PostgreSQL connection settings
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,  // Use DATABASE_URL from environment
  ssl: {
    rejectUnauthorized: false  // Important for connecting securely to PostgreSQL
  },
});

// Test database connection
pool.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err);
  } else {
    console.log('Connected to PostgreSQL');
  }
});

// Basic route for testing the app
app.get('/', (req, res) => {
  res.send('Hello, world!');
});

// Listen on IPv6 (::) for private network
app.listen(port, '::', () => {
  console.log(`Server is running on port ${port}`);
});
