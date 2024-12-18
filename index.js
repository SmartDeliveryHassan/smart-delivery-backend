const express = require('express');
const app = express();
const { Pool } = require('pg');
const port = process.env.PORT || 3000;
const cors = require('cors');

// Middleware for parsing JSON bodies and handling CORS
app.use(express.json());
app.use(cors());  // Allow cross-origin requests (especially for mobile apps)

// PostgreSQL connection settings (using DATABASE_URL environment variable)
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,  // Important for securely connecting to PostgreSQL
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

// Basic route for testing
app.get('/', (req, res) => {
  res.send('Hello, world!');
});

// API route to execute queries passed as a string
app.post('/execute-query', async (req, res) => {
  const { query } = req.body;  // Extract SQL query from request body

  if (!query) {
    return res.status(400).json({ success: false, message: 'Query is required' });
  }

  try {
    // Execute the query
    const result = await pool.query(query);
    
    // If SELECT query, return the rows
    if (result.rows) {
      return res.status(200).json({
        success: true,
        data: result.rows,  // Return rows for SELECT queries
      });
    } else {
      // For DML queries (INSERT, UPDATE, DELETE), return success message
      return res.status(200).json({
        success: true,
        message: 'Query executed successfully',  // Success message for DML queries
      });
    }
  } catch (err) {
    console.error('Error executing query:', err);
    return res.status(500).json({
      success: false,
      message: 'Error executing query: ' + err.message,
    });
  }
});

// Listen on IPv6 (::) for private network
app.listen(port, '::', () => {
  console.log(`Server is running on port ${port}`);
});
