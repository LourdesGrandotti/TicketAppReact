// -----------------------------------------------------------------------
// Define las rutas (endpoints) relacionadas a usuarios y las conecta
// con las funciones del controlador correspondiente.
// -----------------------------------------------------------------------

const express = require('express');
const router = express.Router();

const { listarUsuarios, crearUsuario, actualizarUsuario, eliminarUsuario } = require('../controllers/usuariosController');

// GET /api/usuarios -> lista todos los usuarios
router.get('/', listarUsuarios);

// POST /api/usuarios -> crea un usuario nuevo
router.post('/', crearUsuario);

// PUT /api/usuarios/:id -> actualiza un usuario
router.put('/:id', actualizarUsuario);

// DELETE /api/usuarios/:id -> elimina un usuario
router.delete('/:id', eliminarUsuario);

module.exports = router;

