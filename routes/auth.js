const express = require("express");
const router = express.Router();
const { getUsers, getUserById, updateUserById, deleteUserById } = require("../controllers/authControllers");
const authMiddleware = require("../middleware/session");
const checkRol = require("../middleware/rol");

/**
 * Definir la ruta base
 */
const baseRoute = "/api/users";

/**
 * Obtener todos los usuarios
 */
router.get(baseRoute, authMiddleware, getUsers);

/**
 * Obtener un usuario por su ID
 */
router.get(`${baseRoute}/:id`, authMiddleware, checkRol(["admin"]), getUserById);

/**
 * Actualizar un usuario por su ID
 */
router.put(`${baseRoute}/:id`, authMiddleware, checkRol(["admin"]), updateUserById);

/**
 * Eliminar un usuario por su ID
 */
router.delete(`${baseRoute}/:id`, authMiddleware, checkRol(["admin"]), deleteUserById);

module.exports = router;
