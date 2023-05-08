const { DataTypes } = require('sequelize');
const sequelize = require('../../config/mysql');

const Webpages = sequelize.define('webpages', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
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

module.exports = Webpages;
