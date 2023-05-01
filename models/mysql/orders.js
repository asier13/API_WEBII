const { sequelize } = require('../../config/mysql');
const { DataTypes } = require('sequelize');

const Order = sequelize.define('orders', {
  status: {
    type: DataTypes.ENUM('pending', 'confirmed', 'shipped', 'delivered'),
    defaultValue: 'pending'
  }
}, {
  timestamps: true
});

module.exports = Order;
