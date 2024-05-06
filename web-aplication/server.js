const express = require('express');
const { Pool } = require('pg');

const app = express();
const port = 3000;

// PostgreSQL database configuration
const pool = new Pool({
    user: 'your_username',
    host: 'localhost',
    database: 'your_database',
    password: 'your_password',
    port: 5432,
});

// Endpoint for searching people by ID
app.get('/search', async (req, res) => {
    const personId = req.query.id;

    try {
        const query = 'SELECT COUNT(*) AS count FROM people WHERE id = $1';
        const result = await pool.query(query, [personId]);

        const exists = result.rows[0].count > 0;
        res.json({ exists });
    } catch (error) {
        console.error('Error executing query:', error);
        res.status(500).json({ error: 'An error occurred while searching for the person.' });
    }
});

// Start server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
