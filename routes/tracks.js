const express = require("express");
const router = express.Router();
const { validatorCreateItem, validatorGetItem } = require("../validators/auth");
const { getItems, getItem, createItem, updateItem, deleteItem } = require("../controllers/authControllers");
const authMiddleware = require("../middleware/session");
const checkRol = require("../middleware/rol");

/**
 * Obtener una lista de todos los productos
 */
router.get("/", authMiddleware, getItems);

/**
 * Obtener los detalles de un producto por id
 */
router.get("/:id", authMiddleware, validatorGetItem, getItem);

/**
 * Crear un nuevo producto
 */
router.post("/", authMiddleware, checkRol(["admin"]), validatorCreateItem, createItem);

/**
 * Actualizar un producto por id
 */
router.put("/:id", authMiddleware, validatorGetItem, validatorCreateItem, updateItem);

/**
 * Eliminar un producto por id
 */
router.delete("/:id", authMiddleware, validatorGetItem, deleteItem);

module.exports = router;
