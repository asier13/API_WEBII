const { sequelize } = require('../../config/mysql');
const { DataTypes } = require('sequelize');

const Cart = sequelize.define('carts', {}, {
  timestamps: true
});

module.exports = Cart;
