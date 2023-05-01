const { sequelize } = require('../../config/mysql');
const { DataTypes } = require('sequelize');

const OrderItem = sequelize.define('orderItems', {
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
}, {
  timestamps: true
});

module.exports = OrderItem;
