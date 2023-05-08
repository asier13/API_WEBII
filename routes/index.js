const express = require('express');
const router = express.Router();
const { users, webpages, commerce } = require('./routes');

// Rutas de usuarios
router.use('/api', users);

// Rutas de páginas web
router.use('/api', webpages);

// Rutas de comercio
router.use('/api', commerce);

module.exports = router;
