// routes/usuario.routes.js
const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuario.controller');

// Ruta GET: /api/usuarios
router.get('/usuarios', usuarioController.obtenerUsuarios);

// Ruta POST: /api/usuarios
router.post('/usuarios', usuarioController.crearUsuario);

module.exports = router