// -----------------------------------------------------------------------
// Este archivo se encarga únicamente de conectar la aplicación a MongoDB
// usando Mongoose. No contiene clases, solo una función simple.
// -----------------------------------------------------------------------

const mongoose = require('mongoose');

// Función que intenta conectar a la base de datos.
// Recibe la cadena de conexión (URI) como parámetro.
async function conectarDB(uri) {
  try {
    await mongoose.connect(uri);
    console.log('✅ Conectado a MongoDB correctamente');
  } catch (error) {
    console.error('❌ Error al conectar a MongoDB:', error.message);
    process.exit(1);
  }
}
module.exports = conectarDB;
