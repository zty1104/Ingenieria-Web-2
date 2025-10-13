// models/usuario.model.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/db.config'); // Importa la conexión

const Usuario = sequelize.define('Usuario', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    email: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true
    }
}, {
    tableName: 'usuarios', // Nombre exacto de la tabla en tu MySQL
    timestamps: false // Si tu tabla no usa campos createdAt y updatedAt
});

module.exports = Usuario