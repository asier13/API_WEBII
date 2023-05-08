const express = require('express');
const cors = require('cors');
const { Sequelize } = require('sequelize');
const  sequelize  = require('./models');
const routes = require('./routes');
require('dotenv').config();

const app = express();

// Configuración de middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Configuración de rutas
app.use('/api', routes);

// Configuración de errores
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Error interno del servidor');
});

// Configuración de la conexión a la base de datos
sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  dialect: 'mysql'
});

// Inicialización del servidor
sequelize.authenticate().then(() => {
  console.log('Conexión a la base de datos establecida correctamente');
  app.listen(3000, () => {
    console.log('Servidor iniciado en el puerto 3000');
  });
}).catch((err) => {
  console.error('Error al conectar a la base de datos:', err);
});
