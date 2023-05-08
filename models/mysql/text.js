const { DataTypes } = require('sequelize');
const sequelize = require('../../config/mysql');

const Text = sequelize.define('text', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    content: {
        type: DataTypes.STRING,
        allowNull: false
    },
    webpage_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'webpages',
            key: 'id'
        }
    }
});

module.exports = Text;
