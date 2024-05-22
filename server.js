// for guest information

const express = require('express');
const { Pool } = require('pg');

const app = express();
const port = 3000;

// PostgreSQL database configuration
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'postgres',
  password: 'adelynsmartnation',
  port: 5432,
});

// Middleware to parse JSON requests
app.use(express.json());

// Routes
app.get('/guests', async (req, res) => {
  try {
    const { rows } = await pool.query('SELECT * FROM guests');
    res.json(rows);
  } catch (err) {
    console.error('Error fetching guests:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.post('/guests', async (req, res) => {
  const { guestName, countryCode, guestPhone, numPax, guestDiet } = req.body;
  const query = 'INSERT INTO guests (guest_name, country_code, guest_phone, num_pax, guest_diet) VALUES ($1, $2, $3, $4, $5)';
  const values = [guestName, countryCode, guestPhone, numPax, guestDiet];

  try {
    await pool.query(query, values);
    res.status(201).json({ message: 'Guest added successfully' });
  } catch (err) {
    console.error('Error adding guest:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

