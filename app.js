const express = require('express');
const mysql = require('mysql2/promise');
const config = require('./config/mysql');

const app = express();

// Configuración de la base de datos
const pool = mysql.createPool(config);

// Middleware para parsear el cuerpo de las solicitudes
app.use(express.json());

// Rutas de la API de comercios
app.post('/api/comercios', async (req, res) => {
  try {
    const [result] = await pool.query('INSERT INTO comercios (nombre, direccion, telefono) VALUES (?, ?, ?)', [req.body.nombre, req.body.direccion, req.body.telefono]);
    res.status(201).json({ message: 'Comercio creado correctamente', id: result.insertId });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al crear el comercio' });
  }
});

app.put('/api/comercios/:id', async (req, res) => {
  try {
    await pool.query('UPDATE comercios SET nombre = ?, direccion = ?, telefono = ? WHERE id = ?', [req.body.nombre, req.body.direccion, req.body.telefono, req.params.id]);
    res.json({ message: 'Comercio modificado correctamente' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al modificar el comercio' });
  }
});

app.get('/api/comercios', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM comercios');
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al obtener la lista de comercios' });
  }
});

app.delete('/api/comercios/:id', async (req, res) => {
  try {
    await pool.query('DELETE FROM comercios WHERE id = ?', [req.params.id]);
    res.json({ message: 'Comercio eliminado correctamente' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al eliminar el comercio' });
  }
});

// Rutas de la API de usuarios
app.post('/api/usuarios', async (req, res) => {
  try {
    const [result] = await pool.query('INSERT INTO usuarios (nombre, email, ciudad) VALUES (?, ?, ?)', [req.body.nombre, req.body.email, req.body.ciudad]);
    res.status(201).json({ message: 'Usuario creado correctamente', id: result.insertId });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al crear el usuario' });
  }
});

app.put('/api/usuarios/:id', async (req, res) => {
  try {
    await pool.query('UPDATE usuarios SET nombre = ?, email = ?, ciudad = ? WHERE id = ?', [req.body.nombre, req.body.email, req.body.ciudad, req.params.id]);
    res.json({ message: 'Usuario modificado correctamente' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al modificar el usuario' });
  }
});

app.get('/api/usuarios', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM usuarios');
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al obtener la lista de usuarios' });
  }
});

app.delete('/api/usuarios/:id', async (req, res) => {
  try {
    await pool.query('DELETE FROM usuarios WHERE id = ?', [req.params.id]);
    res.json({ message: 'Usuario eliminado correctamente' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al eliminar el usuario' });
  }
});

// Rutas de la API de páginas web
app.post('/api/paginas-web', async (req, res) => {
  try {
    const [result] = await pool.query('INSERT INTO paginas_web (nombre, url, descripcion) VALUES (?, ?, ?)', [req.body.nombre, req.body.url, req.body.descripcion]);
    res.status(201).json({ message: 'Página web creada correctamente', id: result.insertId });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al crear la página web' });
  }
});

app.put('/api/paginas-web/:id', async (req, res) => {
  try {
    await pool.query('UPDATE paginas_web SET nombre = ?, url = ?, descripcion = ? WHERE id = ?', [req.body.nombre, req.body.url, req.body.descripcion, req.params.id]);
    res.json({ message: 'Página web modificada correctamente' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al modificar la página web' });
  }
});

app.get('/api/paginas-web', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM paginas_web');
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al obtener la lista de páginas web' });
  }
});

app.delete('/api/paginas-web/:id', async (req, res) => {
  try {
    await pool.query('DELETE FROM paginas_web WHERE id = ?', [req.params.id]);
    res.json({ message: 'Página web eliminada correctamente' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al eliminar la página web' });
  }
});

// Manejo de errores
app.use((req, res) => {
  res.status(404).json({ message: 'Ruta no encontrada' });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Error interno del servidor' });
});

module.exports = app;
