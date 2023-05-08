const { DataTypes } = require('sequelize');
const sequelize = require('../../config/mysql');

const Pictures = sequelize.define('pictures', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    url: {
        type: DataTypes.STRING,
        allowNull: false
    },
    commerce_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'commerce',
            key: 'id'
        }
    }
});

module.exports = Pictures;
