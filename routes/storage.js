const express = require('express');
const router = express.Router();
const { getProducts, getProduct, createProduct, updateProduct, deleteProduct } = require('../controllers/products');
const { getOrders, getOrder, createOrder, updateOrder, deleteOrder } = require('../controllers/orders');

// Rutas para productos
router.get('/products', getProducts);
router.get('/products/:id', getProduct);
router.post('/products', createProduct);
router.put('/products/:id', updateProduct);
router.delete('/products/:id', deleteProduct);

// Rutas para órdenes
router.get('/orders', getOrders);
router.get('/orders/:id', getOrder);
router.post('/orders', createOrder);
router.put('/orders/:id', updateOrder);
router.delete('/orders/:id', deleteOrder);

module.exports = router;
