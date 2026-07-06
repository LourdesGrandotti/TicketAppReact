# TicketApp — Migración a React

Base compartida ya armada (Vite + React Router + Context API). **No recrear la estructura de nuevo**: cada persona clona esto, crea su rama, y migra su parte encima.

## Cómo arrancar (cada integrante)

```bash
git clone <url-del-repo>
cd ticketapp-react
npm install
npm run dev
```

Abre en `http://localhost:5173`. El backend (Express/Mongo, sin cambios) se levanta aparte:
```bash
cd backend
npm install
npm run dev   # o el script que tengan, corre en localhost:3000
```

## Reparto sugerido (7 personas)

| Página(s) | Archivo(s) React | Complejidad | Migrar desde (original) |
|---|---|---|---|
| Home | `src/pages/Home.jsx` | Baja | `home.html`, `js/main.js`, `js/modules/script.js` |
| Login + Registro | `src/pages/Login.jsx`, `Registro.jsx` | Media | `login.html`, `registro.html`, `js/modules/login.js` |
| Partidos | `src/pages/Partidos.jsx` | Media-Alta | `partidos.html`, `js/modules/matches.js` |
| Estadio | `src/pages/Estadio.jsx` | Media | `estadio.html`, `estadio-actions.js`, `matchInfo.js` |
| Asientos (2 personas) | `src/pages/Asientos.jsx` | Alta | `asientos.html`, `js/asientos.js`, `js/modules/seating.js` |
| Carrito + Checkout (2 personas) | `src/pages/Carrito.jsx` | Alta | `carrito.html`, `js/modules/cart.js`, `checkout.js` |
| Perfil | `src/pages/Perfil.jsx` | Media-Alta | `perfil.html`, `js/modules/profile.js` |
| Admin | `src/pages/Admin.jsx` | Alta | `admin.html`, `js/modules/admin/*.js` |

Cada `.jsx` en `src/pages/` ya tiene un comentario `TODO` arriba indicando qué migrar y de qué archivo original. Empezá por ahí.

## Reglas para no pisarse

- **Una rama por persona/página**: `git checkout -b migracion-partidos`, etc. Nunca trabajar directo sobre `main`.
- **Commits chicos y frecuentes**, no un commit gigante al final (van a evaluar el historial).
- Si necesitás algo del `AuthContext` o `CartContext` que no existe todavía, **agregalo ahí** (`src/context/`) en vez de manejar tu propio estado local aislado — así todas comparten la misma fuente de verdad, como antes compartían `localStorage`.
- Extraé piezas repetidas a `src/components/` (ej: `MatchCard`, `CartItem`) en vez de duplicar JSX entre páginas.
- Antes de hacer merge a `main`: probá que tu página levanta sin errores en consola (`npm run dev`) y que la navegación hacia/desde otras páginas no rompe nada.

## Qué ya está resuelto (no lo migres de nuevo)

- Estructura de carpetas y rutas (`src/App.jsx`).
- Navbar y Footer (`src/components/`) — si necesitás cambiar el estado de sesión que muestran, hacelo vía `AuthContext`, no edites el componente para "hardcodear" un caso.
- `AuthContext` y `CartContext` — reemplazan lo que antes hacían `auth.js`, `storage.js` y `cart.js` a mano con `localStorage`.
- `src/services/usuariosService.js` — espejo de las rutas del backend (`/api/usuarios`), no reescribir el backend.
- Assets e imágenes ya copiados a `public/assets/`, CSS original en `public/css/` (podés seguir usando esas clases).

## Para el informe final

Mientras migrás, anotá (aunque sea en un doc compartido de a un párrafo por persona):
- Qué le pediste a la IA y qué descartaste.
- Qué tuviste que investigar/entender para que funcione.
- Qué parte de tu página fue la más difícil de traducir a componentes/estado.

Eso es literalmente lo que pide el informe — es mucho más fácil escribirlo si lo anotás sobre la marcha que reconstruirlo el lunes a la noche.
