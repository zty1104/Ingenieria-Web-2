// mock-api/config/db.config.js

// 1. Carga las variables del .env en process.env
require('dotenv').config({ path: '../.env' }); // **NOTA IMPORTANTE: Ajuste la ruta**
const { Sequelize } = require('sequelize');

// 2. Crea la instancia de Sequelize usando las variables de entorno
const sequelize = new Sequelize(
    process.env.DB_NAME, 
    process.env.DB_USER, 
    process.env.DB_PASS, {
        host: process.env.DB_HOST,
        dialect: 'mysql', 
        logging: false 
    }
);

// 3. Prueba la conexión (se ejecuta al cargar este archivo)
async function testConnection() {
    try {
        await sequelize.authenticate();
        console.log('✅ Conexión a MySQL establecida correctamente.');
    } catch (error) {
        // Asegúrate de que MySQL esté corriendo, las credenciales sean correctas, y la DB exista.
        console.error('❌ ERROR de conexión a la base de datos:', error.message);
    }
}

testConnection();

module.exports = sequelize; // Exporta la instancia para usarla en los modelos