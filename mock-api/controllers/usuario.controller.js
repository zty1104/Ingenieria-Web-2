// controllers/usuario.controller.js
const Usuario = require('../models/usuario.model'); 

// Controlador para OBTENER todos los usuarios (GET)
exports.obtenerUsuarios = async (req, res) => {
    try {
        // SELECT * FROM usuarios;
        const usuarios = await Usuario.findAll(); 
        res.status(200).json(usuarios); 
    } catch (error) {
        console.error('Error al obtener usuarios:', error);
        res.status(500).json({ mensaje: "Error interno al acceder a MySQL." });
    }
};

// Controlador para CREAR un nuevo usuario (POST)
exports.crearUsuario = async (req, res) => {
    const { nombre, email } = req.body;
    
    try {
        // INSERT INTO usuarios (nombre, email) VALUES (req.body.nombre, req.body.email);
        const nuevoUsuario = await Usuario.create({ nombre, email });
        res.status(201).json(nuevoUsuario);
    } catch (error) {
        console.error('Error al crear usuario:', error);
        // Si hay un error de validación (ej: email repetido)
        res.status(400).json({ mensaje: 'Error: Datos no válidos o email ya registrado.' }); 
    }
}