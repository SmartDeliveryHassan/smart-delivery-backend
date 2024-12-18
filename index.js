const express = require('express');
const { Pool } = require('pg');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

// Set up PostgreSQL client
const pool = new Pool({
  user: process.env.PGUSER,
  host: process.env.PGHOST,
  database: process.env.PGDATABASE,
  password: process.env.PGPASSWORD,
  port: process.env.PGPORT,
});

// Basic route to check connection
app.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT NOW()');
    res.send(`Connected to PostgreSQL! Current time: ${result.rows[0].now}`);
  } catch (err) {
    res.status(500).send('Error connecting to database');
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
