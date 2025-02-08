const express = require('express');
const router = express.Router();
const { Pool } = require('pg');

const pool = new Pool({
  user: process.env.DATABASE_USER || 'user',
  host: process.env.DATABASE_HOST || 'db',
  database: process.env.DATABASE_NAME || 'mydatabase',
  password: process.env.DATABASE_PASSWORD || 'password',
  port: process.env.DATABASE_PORT || 5432,
});

// Crear una persona
router.post('/', async (req, res) => {
  const { primer_nombre, segundo_nombre, apellidos, fecha_nacimiento, genero, correo, celular, nro_documento, tipo_documento, foto } = req.body;
  try {
    const result = await pool.query(
      `INSERT INTO personas 
        (primer_nombre, segundo_nombre, apellidos, fecha_nacimiento, genero, correo_electronico, celular, nro_documento, tipo_documento, foto)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
       RETURNING *`,
      [primer_nombre, segundo_nombre, apellidos, fecha_nacimiento, genero, correo, celular, nro_documento, tipo_documento, foto]
    );
    res.json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al crear la persona' });
  }
});

// Obtener todas las personas
router.get('/', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM public.personas');
        res.json(result.rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener las personas' });
    }
});

// Obtener una persona por ID
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('SELECT * FROM public.personas WHERE id = $1', [id]);
    if (result.rows.length === 0) {
      res.status(404).json({ error: 'Persona no encontrada' });
    } else {
      res.json(result.rows[0]);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener la persona' });
  }
});

// Actualizar una persona
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { primer_nombre, segundo_nombre, apellidos, fecha_nacimiento, genero, correo, celular, nro_documento, tipo_documento, foto } = req.body;
  try {
    const result = await pool.query(
      `UPDATE personas 
       SET primer_nombre = $1, segundo_nombre = $2, apellidos = $3, fecha_nacimiento = $4, genero = $5, correo_electronico = $6, celular = $7, nro_documento = $8, tipo_documento = $9, foto = $10
       WHERE id = $11
       RETURNING *`,
      [primer_nombre, segundo_nombre, apellidos, fecha_nacimiento, genero, correo, celular, nro_documento, tipo_documento, foto, id]
    );
    if (result.rows.length === 0) {
      res.status(404).json({ error: 'Persona no encontrada' });
    } else {
      res.json(result.rows[0]);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al actualizar la persona' });
  }
});

// Eliminar una persona
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('DELETE FROM public.personas WHERE id = $1 RETURNING *', [id]);
    if (result.rows.length === 0) {
      res.status(404).json({ error: 'Persona no encontrada' });
    } else {
      res.json({ message: 'Persona eliminada', persona: result.rows[0] });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al eliminar la persona' });
  }
});

module.exports = router;
