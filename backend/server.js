// -----------------------------------------------------------------------
// Punto de entrada del backend
//
// Stack: Node.js + Express + MongoDB (Mongoose)
// - Sin TypeScript
// - Sin Programación Orientada a Objetos (solo funciones simples)
// - Sin XML (todas las respuestas son JSON)
// - JavaScript vanilla
// -----------------------------------------------------------------------

require('dotenv').config();

const express = require('express');
const cors = require('cors');

const conectarDB = require('./config/db');
const usuariosRoutes = require('./routes/usuarios');
const Usuario = require('./models/Usuario');

const app = express();
const PORT = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/ticketapp';


app.use(cors()); // permite que el frontend (otro origen) pueda consumir la API
app.use(express.json()); // permite leer JSON en el body de las peticiones (req.body)

// --- Ruta de prueba ---
// Sirve para chequear rápido que el servidor está levantado.
app.get('/', (req, res) => {
  res.status(200).json({
    ok: true,
    mensaje: 'Backend de TicketApp funcionando correctamente 🎟️',
  });
});

// --- Rutas de la API ---
// Todo lo relacionado a usuarios queda bajo el prefijo /api/usuarios
app.use('/api/usuarios', usuariosRoutes);

// --- Manejo de rutas no encontradas ---
app.use((req, res) => {
  res.status(404).json({
    ok: false,
    mensaje: 'Ruta no encontrada',
  });
});

// --- Arranque del servidor ---
conectarDB(MONGODB_URI).then(async () => {
  // Datos del admin por defecto
  const adminData = {
    nombre_usuario: 'admin',
    mail_usuario: 'admin@ticketapp.com',
    contraseña_usuario: 'admin123',
    rol: 'admin'
  };

  try {
    // Buscamos si ya existe un usuario con este mail
    const adminExists = await Usuario.findOne({ mail_usuario: adminData.mail_usuario }); 
    
    if (!adminExists) {
      // Creamos el admin usando el modelo de Mongoose (esto respeta schema y timestamps)
      const nuevoAdmin = new Usuario(adminData);
      await nuevoAdmin.save();
      console.log('✅ Usuario admin precargado correctamente');
    } else {
      console.log('ℹ️ El usuario admin ya existía en la base de datos');
    }
  } catch (error) {
    console.error('❌ Error al precargar admin:', error.message);
  }

  // Levantar Express
  app.listen(PORT, () => {
    console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
  });
});
