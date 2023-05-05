const express = require("express");
const router = express.Router();
const { getProducts, getProductById, createProduct, updateProduct, deleteProduct } = require("../controllers/commerce");
const authMiddleware = require("../middleware/session");
const checkRol = require("../middleware/rol");

/**
 * Obtener una lista de todos los productos
 */
router.get("/products", authMiddleware, async (req, res, next) => {
  try {
    const products = await getProducts();
    res.status(200).json(products);
  } catch (err) {
    next(err);
  }
});

/**
 * Obtener los detalles de un producto por id
 */
router.get("/products/:id", authMiddleware, async (req, res, next) => {
  try {
    const product = await getProductById(req.params.id);
    res.status(200).json(product);
  } catch (err) {
    next(err);
  }
});

/**
 * Crear un nuevo producto
 */
router.post("/products", authMiddleware, checkRol(["admin"]), async (req, res, next) => {
  try {
    const product = await createProduct(req.body);
    res.status(201).json(product);
  } catch (err) {
    next(err);
  }
});

/**
 * Actualizar un producto por id
 */
router.put("/products/:id", authMiddleware, async (req, res, next) => {
  try {
    const product = await updateProduct(req.params.id, req.body);
    res.status(200).json(product);
  } catch (err) {
    next(err);
  }
});

/**
 * Eliminar un producto por id
 */
router.delete("/products/:id", authMiddleware, async (req, res, next) => {
  try {
    await deleteProduct(req.params.id);
    res.status(204).send();
  } catch (err) {
    next(err);
  }
});

module.exports = router;
