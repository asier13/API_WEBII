const express = require('express');
const router = express.Router();
const Order = require('../models/mysql/orders');
const Product = require('../models/mysql/products');

// Obtener una lista de todas las órdenes
router.get('/orders', async (req, res, next) => {
  try {
    const orders = await Order.findAll();
    res.status(200).json(orders);
  } catch (err) {
    next(err);
  }
});

// Obtener los detalles de una orden por id
router.get('/orders/:id', async (req, res, next) => {
  try {
    const order = await Order.findByPk(req.params.id);
    if (!order) {
      throw new Error('Order not found');
    }
    res.status(200).json(order);
  } catch (err) {
    next(err);
  }
});

// Crear una nueva orden
router.post('/orders', async (req, res, next) => {
  try {
    const order = await Order.create(req.body);
    res.status(201).json(order);
  } catch (err) {
    next(err);
  }
});

// Actualizar una orden por id
router.put('/orders/:id', async (req, res, next) => {
  try {
    const order = await Order.findByPk(req.params.id);
    if (!order) {
      throw new Error('Order not found');
    }
    await order.update(req.body);
    res.status(200).json(order);
  } catch (err) {
    next(err);
  }
});

// Eliminar una orden por id
router.delete('/orders/:id', async (req, res, next) => {
  try {
    const order = await Order.findByPk(req.params.id);
    if (!order) {
      throw new Error('Order not found');
    }
    await order.destroy();
    res.status(204).send();
  } catch (err) {
    next(err);
  }
});

// Obtener una lista de todos los productos
router.get('/products', async (req, res, next) => {
  try {
    const products = await Product.findAll();
    res.status(200).json(products);
  } catch (err) {
    next(err);
  }
});

// Obtener los detalles de un producto por id
router.get('/products/:id', async (req, res, next) => {
  try {
    const product = await Product.findByPk(req.params.id);
    if (!product) {
      throw new Error('Product not found');
    }
    res.status(200).json(product);
  } catch (err) {
    next(err);
  }
});

// Crear un nuevo producto
router.post('/products', async (req, res, next) => {
  try {
    const product = await Product.create(req.body);
    res.status(201).json(product);
  } catch (err) {
    next(err);
  }
});

// Actualizar un producto por id
router.put('/products/:id', async (req, res, next) => {
  try {
    const product = await Product.findByPk(req.params.id);
    if (!product) {
      throw new Error('Product not found');
    }
    await product.update(req.body);
    res.status(200).json(product);
  } catch (err) {
    next(err);
  }
});

// Eliminar un producto por id
router.delete('/products/:id', async (req, res, next) => {
  try {
    const product = await Product.findByPk(req.params.id);
    if (!product) {
      throw new Error('Product not found');
    }
    await product.destroy();
    res.status(204).send();
  } catch (err) {
    next(err);
  }
});

module.exports = router;
