
// -----------------------------------------------------------------------
// Contiene la lógica de cada endpoint.
// -----------------------------------------------------------------------

const Usuario = require('../models/Usuario');

// GET /api/usuarios
// Lista todos los usuarios de la colección.
async function listarUsuarios(req, res) {
  try {
    // Devolvemos todos los campos (incluyendo la contraseña) para que el frontend pueda validar el login
    const usuarios = await Usuario.find();

    res.status(200).json({
      ok: true,
      cantidad: usuarios.length,
      usuarios: usuarios,
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      mensaje: 'Error al listar los usuarios',
      error: error.message,
    });
  }
}

// POST /api/usuarios
// Crea un nuevo usuario en la colección.
async function crearUsuario(req, res) {
  try {
    const { nombre_usuario, mail_usuario, contraseña_usuario, rol, documento, pais, tipo_documento } = req.body;

    // Validación simple de campos obligatorios
    if (!nombre_usuario || !mail_usuario || !contraseña_usuario) {
      return res.status(400).json({
        ok: false,
        mensaje: 'Faltan datos obligatorios: nombre_usuario, mail_usuario y contraseña_usuario son requeridos',
      });
    }

    // Verificamos que no exista ya un usuario con ese mail
    const usuarioExistente = await Usuario.findOne({ mail_usuario: mail_usuario.toLowerCase() });
    if (usuarioExistente) {
      return res.status(409).json({
        ok: false,
        mensaje: 'Ya existe un usuario registrado con ese correo electrónico',
      });
    }

    const nuevoUsuario = new Usuario({
      nombre_usuario,
      mail_usuario,
      contraseña_usuario,
      rol,
      documento,
      pais,
      tipo_documento,
    });

    const usuarioGuardado = await nuevoUsuario.save();

    // Armamos la respuesta sin exponer la contraseña
    const usuarioRespuesta = usuarioGuardado.toObject();
    delete usuarioRespuesta.contraseña_usuario;

    res.status(201).json({
      ok: true,
      mensaje: 'Usuario creado correctamente',
      usuario: usuarioRespuesta,
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      mensaje: 'Error al crear el usuario',
      error: error.message,
    });
  }
}

// PUT /api/usuarios/:id
// Actualiza un usuario
async function actualizarUsuario(req, res) {
  try {
    const { id } = req.params;
    const usuarioActualizado = await Usuario.findByIdAndUpdate(id, req.body, { new: true });
    res.status(200).json({ ok: true, usuario: usuarioActualizado });
  } catch (error) {
    res.status(500).json({ ok: false, mensaje: 'Error al actualizar', error: error.message });
  }
}

// DELETE /api/usuarios/:id
// Elimina un usuario
async function eliminarUsuario(req, res) {
  try {
    const { id } = req.params;
    await Usuario.findByIdAndDelete(id);
    res.status(200).json({ ok: true, mensaje: 'Usuario eliminado' });
  } catch (error) {
    res.status(500).json({ ok: false, mensaje: 'Error al eliminar', error: error.message });
  }
}

module.exports = {
  listarUsuarios,
  crearUsuario,
  actualizarUsuario,
  eliminarUsuario,
};
