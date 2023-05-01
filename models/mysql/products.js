const { sequelize } = require('../../config/mysql');
const { DataTypes } = require('sequelize');

const Product = sequelize.define('products', {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  price: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  },
  imageUrl: {
    type: DataTypes.STRING
  }
}, {
  timestamps: true
});

module.exports = Product;
