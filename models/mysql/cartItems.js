const { sequelize } = require('../../config/mysql');
const { DataTypes } = require('sequelize');

const CartItem = sequelize.define('cartItems', {
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
}, {
  timestamps: true
});

module.exports = CartItem;
