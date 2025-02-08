require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

// Configurar PostgreSQL
const pool = new Pool({
  user: process.env.DATABASE_USER || 'user',
  host: process.env.DATABASE_HOST || 'db',
  database: process.env.DATABASE_NAME || 'mydatabase',
  password: process.env.DATABASE_PASSWORD || 'password',
  port: process.env.DATABASE_PORT || 5432,
});

// Ruta de prueba
app.get('/', (req, res) => {
  res.send('Backend funcionando!');
});

// Prueba de conexión a la base de datos
app.get('/test-db', async (req, res) => {
  try {
    const result = await pool.query('SELECT NOW()');
    res.json({ message: 'Conexión exitosa!', time: result.rows[0] });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error conectando a la base de datos' });
  }
});

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
