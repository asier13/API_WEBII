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
router.get(baseRoute, authMiddleware, async (req, res, next) => {
  try {
    const users = await getUsers();
    res.status(200).json(users);
  } catch (err) {
    next(err);
  }
});

/**
 * Obtener un usuario por su ID
 */
router.get(`${baseRoute}/:id`, authMiddleware, checkRol(["admin"]), async (req, res, next) => {
  try {
    const user = await getUserById(req.params.id);
    res.status(200).json(user);
  } catch (err) {
    next(err);
  }
});

/**
 * Actualizar un usuario por su ID
 */
router.put(`${baseRoute}/:id`, authMiddleware, checkRol(["admin"]), async (req, res, next) => {
  try {
    const user = await updateUserById(req.params.id, req.body);
    res.status(200).json(user);
  } catch (err) {
    next(err);
  }
});

/**
 * Eliminar un usuario por su ID
 */
router.delete(`${baseRoute}/:id`, authMiddleware, checkRol(["admin"]), async (req, res, next) => {
  try {
    await deleteUserById(req.params.id);
    res.status(204).send();
  } catch (err) {
    next(err);
  }
});

module.exports = router;
