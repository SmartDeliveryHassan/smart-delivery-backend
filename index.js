const { Pool } = require('pg');
require('dotenv').config(); // Load environment variables from .env file

const pool = new Pool({
  connectionString: process.env.DATABASE_URL, // Use DATABASE_URL if defined
  ssl: {
    rejectUnauthorized: false,  // Enable SSL if required by Railway
  },
});

pool.connect((err) => {
  if (err) {
    console.error('Error connecting to database:', err);
  } else {
    console.log('Connected to PostgreSQL');
  }
});
