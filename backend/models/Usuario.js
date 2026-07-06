// -----------------------------------------------------------------------
// Definición del esquema (estructura) de la colección "usuarios" en MongoDB.
// Usamos Mongoose solo para describir la forma de los datos, no para
// programación orientada a objetos: no se crean clases propias acá.
//
// Los nombres de los campos respetan los que ya usa el frontend
// (guardados hoy en localStorage) para facilitar la integración:
// nombre_usuario, mail_usuario, contraseña_usuario, rol, etc.
// -----------------------------------------------------------------------

const mongoose = require('mongoose');

const usuarioSchema = new mongoose.Schema(
  {
    nombre_usuario: {
      type: String,
      required: true,
      trim: true,
    },
    mail_usuario: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      unique: true, // no puede haber dos usuarios con el mismo mail
    },
    contraseña_usuario: {
      type: String,
      required: true,
    },
    rol: {
      type: String,
      enum: ['admin', 'user'], // solo permite estos dos valores
      default: 'user',
    },
    documento: {
      type: String,
      default: '',
    },
    pais: {
      type: String,
      default: '',
    },
    tipo_documento: {
      type: String,
      default: '',
    },
  },
  {
    // Agrega automáticamente createdAt y updatedAt
    timestamps: true,
  }
);

// Exportamos el modelo. Mongoose va a usar la colección "usuarios"
module.exports = mongoose.model('Usuario', usuarioSchema);
