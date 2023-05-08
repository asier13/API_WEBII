const express = require('express');
const router = express.Router();
const { 
    getUsers, 
    createUser, 
    getUserById, 
    updateUserById, 
    deleteUserById 
} = require('../controllers/users');
const { check } = require('express-validator');

// Ruta para obtener todos los usuarios
router.get('/users', getUsers);

// Ruta para crear un nuevo usuario
router.post('/users', [
    check('name').notEmpty(),
    check('email').isEmail(),
    check('password').notEmpty()
], createUser);

// Ruta para obtener un usuario por id
router.get('/users/:id', getUserById);

// Ruta para actualizar un usuario por id
router.put('/users/:id', [
    check('name').notEmpty(),
    check('email').isEmail(),
    check('password').notEmpty(),
    check('role').notEmpty()
], updateUserById);

// Ruta para eliminar un usuario por id
router.delete('/users/:id', deleteUserById);

module.exports = router;
