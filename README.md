# TicketApp 🎟️ — Sistema de Venta de Entradas para el Mundial 2026

**TicketApp** es una aplicación web interactiva para la reserva y compra de entradas para la Copa del Mundo de la FIFA 2026. El sistema permite a los usuarios explorar los partidos del torneo, seleccionar asientos de forma visual e interactiva en un mapa de estadio, gestionar un carrito de compras, y completar su registro y autenticación de manera segura. Asimismo, incluye un módulo de administración completo para controlar y monitorear el flujo de compras.

> **Nota de migración**: este proyecto fue desarrollado originalmente con HTML, CSS y JavaScript vanilla, y luego migrado íntegramente a **React** (con Vite y React Router) como parte de un ejercicio de aprendizaje de la cursada. El backend (Node.js + Express + MongoDB) no cambió — la migración fue exclusivamente del frontend.

---

## 👥 Equipo de Desarrollo

Este proyecto fue desarrollado con compromiso, dedicación y trabajo en equipo por:

*   **Aramayo Liberata**
*   **Escarlon Milagros**
*   **Madera Chiara**
*   **Gorosito Mailen**
*   **Mesa Fiama**
*   **Alave Mailen**
*   **Grandotti Lourdes Priscila**

---

## 🚀 Características Principales

### 🔹 Módulo de Clientes (Frontend — React)
*   **Landing Page (`Home`, ruta `/`)**: Página de inicio con carrusel de próximos partidos destacados y accesos rápidos.
*   **Explorador de Partidos (`Partidos`, ruta `/partidos`)**: Calendario de encuentros de la Copa del Mundo, filtrable por fase (16avos, 8avos, 4tos, Semifinal, Final).
*   **Detalle de Estadio (`Estadio`, ruta `/estadio`)**: Información del partido elegido y selección de sector/cantidad de entradas.
*   **Reserva de Asientos Interactiva (`Asientos`, ruta `/asientos`)**: Mapa de asientos por sector donde el usuario selecciona butacas en tiempo real, con sincronización entre pestañas para evitar reservas duplicadas.
*   **Carrito de Compras (`Carrito`, ruta `/carrito`)**: Resumen de entradas seleccionadas agrupado por sector, cálculo de cargo por servicio y total, flujo de pago (con tarjeta simulada) y confirmación de compra.
    > ⚠️ El pago es **simulado**: no se procesa ningún cobro real ni se integra con una pasarela de pago — es solo para completar el flujo de compra a modo demostrativo.
*   **Autenticación y Registro (`Login` / `Registro`, rutas `/login` y `/registro`)**: Flujo de registro e inicio de sesión, con redirección según el rol del usuario (Cliente / Administrador).
*   **Perfil de Usuario (`Perfil`, ruta `/perfil`)**: Vista personalizada con los datos del usuario y su historial de compras de entradas.

### 🔸 Módulo de Administración (Frontend — React)
*   **Panel Administrativo (`Admin`, ruta `/admin`)**: Panel exclusivo para administradores, organizado en pestañas:
    *   **Dashboard**: métricas generales de ventas y ocupación.
    *   **Gestión de Partidos**: alta y edición de partidos del torneo.
    *   **Auditoría**: registro de actividad sobre reservas y transacciones.
    *   Acceso protegido según el rol del usuario autenticado (`AuthContext`).

### ⚙️ Arquitectura del Servidor (Backend — sin cambios respecto al original)
*   **Servicio Web REST**: Desarrollado con Node.js y Express.
*   **Persistencia de datos**: Integrado con MongoDB a través de Mongoose.
*   **Seguridad y Configuración**: Uso de variables de entorno y soporte CORS integrado.
*   **Cuentas Administrador por defecto**: Precarga automática de un usuario administrador de ejemplo al iniciar el servidor por primera vez.

---

## 🛠️ Tecnologías Utilizadas

### Frontend (Interfaz de Usuario)
*   **React 19**: Librería de UI basada en componentes.
*   **Vite**: Bundler y servidor de desarrollo.
*   **React Router**: Enrutamiento del lado del cliente (SPA) y manejo de rutas protegidas.
*   **Context API**: Estado global de sesión (`AuthContext`) y carrito de compras (`CartContext`).
*   **Bootstrap 5 & Bootstrap Icons**: Maquetación, grids y componentes responsivos.
*   **Chart.js**: Gráficos del dashboard administrativo.
*   **Flag Icons**: Renderizado dinámico de banderas de las selecciones nacionales.

### Backend (Lógica de Servidor)
*   **Node.js**: Entorno de ejecución de JS en el servidor.
*   **Express**: Framework de enrutamiento para la creación de la API REST.
*   **MongoDB & Mongoose**: Base de datos NoSQL y modelado de datos schema-based.
*   **Dotenv**: Configuración modular para secretos de entorno.
*   **Nodemon**: Herramienta de desarrollo para reinicio automático del servidor al detectar cambios de código.

---

## 📁 Estructura del Proyecto

```text
TicketAppReact/
│
├── src/                           # Código del frontend (React)
│   ├── pages/                     # Una página por ruta (Home, Login, Registro,
│   │                               Partidos, Estadio, Asientos, Carrito, Perfil, Admin)
│   ├── components/                 # Componentes reutilizables (Navbar, Footer,
│   │   ├── admin/                   MatchCard, SeatButton, SeatsGrid, etc.)
│   │   └── checkout/               # Subcomponentes del flujo de compra (Resumen,
│   │                                 Formulario de Pago, Compra Exitosa, etc.)
│   ├── context/                    # Estado global: AuthContext, CartContext
│   ├── hooks/                      # Lógica reutilizable: useCheckout, useSeating, useAdmin
│   ├── services/                   # Comunicación con el backend (api.js, usuariosService.js)
│   ├── data/                       # Datos de partidos y sectores del estadio
│   ├── utils/                      # Funciones auxiliares
│   ├── App.jsx                     # Definición de rutas de la aplicación
│   └── main.jsx                    # Punto de entrada de React
│
├── public/                        # Assets estáticos servidos tal cual
│   ├── assets/                     # Imágenes, logos, favicon
│   └── css/                        # Hojas de estilo (styles, admin, carrito)
│
├── index.html                     # Único HTML de la SPA (monta la app de React)
├── vite.config.js                 # Configuración de Vite
├── package.json                   # Dependencias y scripts del frontend
│
├── backend/                       # Servidor y API del backend (sin cambios)
│   ├── config/                     # Configuración de base de datos (MongoDB)
│   ├── controllers/                # Controladores con las funciones de negocio de la API
│   ├── models/                     # Definición de Schemas de Mongoose (Usuario, etc.)
│   ├── routes/                     # Definición de endpoints de Express (/api/usuarios, etc.)
│   ├── server.js                   # Punto de entrada principal del servidor Express
│   ├── package.json                # Dependencias y scripts del backend
│   └── .env.example                # Plantilla para variables de entorno
│
└── README.md                      # Documentación general del proyecto (este archivo)
```

---

## ⚡ Instalación y Configuración

### 1. Clonar o descargar el repositorio
Asegúrate de descargar todo este directorio a tu máquina local.

```bash
git clone <url-del-repositorio>
cd TicketAppReact
```

### 2. Configurar el Backend

1. Dirígete a la carpeta `backend`:
   ```bash
   cd backend
   ```
2. Instala las dependencias necesarias:
   ```bash
   npm install
   ```
3. Crea un archivo `.env` en la raíz de la carpeta `backend` guiándote del siguiente formato:
   ```env
   PORT=3000
   MONGODB_URI=mongodb:/ticketapp
   ```
   *(Nota: Puedes cambiar la URI de conexión si usas MongoDB Atlas o tienes otra configuración en tu puerto local)*.

### 3. Iniciar el Servidor de Backend

*   **Para desarrollo (con reinicio automático al guardar cambios):**
    ```bash
    npm run dev
    ```
*   **Para producción u operaciones normales:**
    ```bash
    npm start
    ```

El servidor imprimirá el mensaje: `🚀 Servidor corriendo en http://localhost:3000` y confirmará la conexión a MongoDB: `✅ Conectado a MongoDB correctamente`.

> [!NOTE]
> Al iniciar el servidor por primera vez, se generará **automáticamente** un usuario Administrador de prueba con las siguientes credenciales para que puedas acceder al panel administrativo de inmediato:
> *   **Email**: `admin@ticketapp.com`
> *   **Contraseña**: `admin123`

### 4. Configurar e iniciar el Frontend (React)

A diferencia de la versión anterior (HTML/CSS/JS vanilla), el frontend ahora es una aplicación React y **no se abre directamente en el navegador** — se levanta con Vite.

1. Desde la raíz del proyecto (no desde `backend/`), instala las dependencias:
   ```bash
   npm install
   ```
2. Iniciá el servidor de desarrollo:
   ```bash
   npm run dev
   ```
3. Abrí la URL que te muestre la terminal (por defecto `http://localhost:5173`).

Otros comandos disponibles:
*   `npm run build` — genera la versión de producción optimizada en la carpeta `dist/`.
*   `npm run preview` — sirve localmente esa versión de producción para probarla antes de publicarla.
*   `npm run lint` — corre el linter (oxlint) sobre el código del frontend.

> [!IMPORTANT]
> El backend y el frontend son dos procesos independientes: necesitás tener **ambos corriendo al mismo tiempo** (backend en `http://localhost:3000`, frontend en `http://localhost:5173`) para que la aplicación funcione por completo.

---

## 🏆 Detalle Pedagógico del Proyecto
*   **Sin XML**: Toda comunicación entre el cliente y el servidor se realiza en formato estándar plano e intercambiable JSON.
*   **Componentización**: La interfaz del frontend está dividida en componentes reutilizables de React, en lugar de páginas HTML independientes repetidas.
*   **Estado centralizado**: La sesión del usuario y el contenido del carrito se manejan con Context API de React, reemplazando el manejo manual de `localStorage` que tenía la versión anterior.
*   **Persistencia Híbrida**: Gestión ágil de carritos y datos de UI local mediante almacenamiento en `localStorage`, respaldada por sincronización directa en la base de datos de MongoDB.
