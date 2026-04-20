const express = require('express');
const mysql = require('mysql2/promise');
const app = express();
const port = 3000;

const dbConfig = {
  host: process.env.DB_HOST || 'db',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || 'password',
  database: process.env.DB_NAME || 'testdb'
};

app.get('/', async (req, res) => {
  try {
    const connection = await mysql.createConnection(dbConfig);
    const [rows] = await connection.execute('SELECT 1 + 1 AS solution');
    res.send(`Connected to MySQL! 1 + 1 = ${rows[0].solution}`);
    await connection.end();
  } catch (error) {
    res.status(500).send(`Error connecting to MySQL: ${error.message}`);
  }
});

app.listen(port, () => {
  console.log(`App running at http://localhost:${port}`);
});
