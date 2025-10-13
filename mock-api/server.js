// mock-api/server.js

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser'); // Aunque express.json() es suficiente, lo mantenemos por consistencia.
// const path = require('path'); // No necesario si las rutas son relativas

// --- PASO 1: Carga de Conexión a MySQL ---
// Importa la instancia de Sequelize configurada en db.config.js
const sequelize = require('./config/db.config'); 
// También cargamos dotenv para el puerto, aunque ya se carga en db.config.js
require('dotenv').config({ path: './.env' }); 

const app = express();
const port = process.env.PORT || 3000; // Usaremos 3000 como puerto por defecto, aunque puedes mantener 3001.

// --- Middlewares Necesarios ---
app.use(cors()); // Permite peticiones de tu Frontend Angular
app.use(express.json()); // Permite a Express leer JSON en el body de las peticiones POST/PUT
app.use(bodyParser.json()); // Mantenemos bodyParser por si lo necesitas, aunque express.json es el moderno.


// --- PASO 2: Importa y Usa las Rutas de la API Real ---
// Asumiendo que has creado usuarioRoutes (ej. para productos o usuarios)
const productoRoutes = require('./routes/producto.routes'); // ASUME que creaste routes/producto.routes.js
// const usuarioRoutes = require('./routes/usuario.routes'); // Si usas usuarios en lugar de productos

app.use('/api/products', productoRoutes); // Mapea las rutas reales a /api/products


// --- Lógica del Mock (Opcional) ---
// NOTA: La lógica de mock (products array, app.get, app.post) DEBE eliminarse.
// Solo puedes mantener el endpoint de reset si lo necesitas para otras pruebas.
/*
app.post('/api/__reset', (req, res) => {
    // Aquí puedes resetear las tablas de MySQL si es necesario, 
    // pero requiere lógica avanzada con Sequelize.
    res.json({ ok: true, message: "Reset simulado. Usa DB para resetear." });
});
*/

// --- PASO 3: Sincronización con MySQL e Inicio del Servidor ---

// sequelize.sync() intenta crear las tablas que defines en tus Modelos (ej: models/producto.model.js)
sequelize.sync({ alter: true }) // 'alter: true' intenta ajustar las tablas sin perder datos
    .then(() => {
        console.log("DB: Modelos sincronizados con MySQL. Iniciando servidor...");
        
        // Iniciar el servidor de Node.js SOLO si la conexión a la DB fue exitosa
        app.listen(port, () => {
            console.log(`Servidor Node.js (API REAL) corriendo en http://localhost:${port}/api/products`);
        });
    })
    .catch(err => {
        console.error("❌ No se pudo iniciar el servidor debido a un error de conexión/sincronización con la DB:", err.message);
        // Es importante no iniciar el servidor si la DB falla.
    })