const express = require('express');
const router = express.Router();
const { 
    registerCtrl, 
    registerCtrlMerchant, 
    loginCtrl, 
    setadminCtrl, 
    updateUser, 
    getUsers, 
    deleteUser 
} = require('../controllers/authController');

// Ruta para registrar un nuevo usuario
router.post('/register', registerCtrl);

// Ruta para registrar un nuevo usuario merchant
router.post('/register-merchant', registerCtrlMerchant);

// Ruta para hacer login del usuario
router.post('/login', loginCtrl);

// Ruta para actualizar el rol de un usuario a admin
router.put('/setadmin', setadminCtrl);

// Ruta para actualizar un usuario
router.put('/update-user/:id', updateUser);

// Ruta para obtener todos los usuarios
router.get('/users', getUsers);

// Ruta para eliminar un usuario
router.delete('/delete-user/:id', deleteUser);

module.exports = router;
