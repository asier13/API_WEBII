const express = require('express');
const router = express.Router();
const { 
    getcommerce, 
    getMerchantById, 
    registerMerchant, 
    updateMerchantById, 
    deleteMerchantById 
} = require('../controllers/commerce');
const { check } = require('express-validator');

// Ruta para obtener todos los comercios
router.get('/commerce', getcommerce);

// Ruta para obtener un comercio por id
router.get('/commerce/:id', getMerchantById);

// Ruta para registrar un nuevo comercio
router.post('/commerce', [
    check('nombre').notEmpty(),
    check('email').isEmail(),
    check('password').notEmpty(),
    check('direccion').notEmpty(),
    check('ciudad').notEmpty()
], registerMerchant);

// Ruta para actualizar un comercio por id
router.put('/commerce/:id', [
    check('nombre').notEmpty(),
    check('email').isEmail(),
    check('password').notEmpty(),
    check('direccion').notEmpty(),
    check('ciudad').notEmpty()
], updateMerchantById);

// Ruta para eliminar un comercio por id
router.delete('/commerce/:id', deleteMerchantById);

module.exports = router;
