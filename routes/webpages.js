const express = require('express');
const router = express.Router();
const { registerPaginaCompleta } = require('../controllers/webpages');
const { check } = require('express-validator');

// Ruta para registrar una página completa
router.post('/webpages', [
    check('nombre').notEmpty(),
    check('url').notEmpty(),
    check('titulo').notEmpty(),
    check('descripcion').notEmpty(),
    check('imagen').notEmpty(),
    check('contenido').notEmpty()
], registerPaginaCompleta);

module.exports = router;
