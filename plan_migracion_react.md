# Guía de Integración en el Proyecto Grupal `ticketapp-react`

Basado en la estructura que creó tu compañera, aquí tenés el mapeo exacto de dónde debés guardar cada uno de los archivos para que tu pantalla de asientos funcione de forma integrada con el resto de la aplicación.

---

## 1. Mapeo de Archivos en `ticketapp-react`

Copió los archivos que te generé en tu carpeta local a las siguientes ubicaciones bajo la estructura de tu compañera:

| Archivo de Asientos | Ubicación de Destino en el Proyecto `ticketapp-react` | Propósito |
| :--- | :--- | :--- |
| **`SeatsScreen.jsx`** | `src/pages/SeatsScreen.jsx` | Vista principal de tu pantalla de selección de asientos. |
| **`useSeating.js`** | `src/hooks/useSeating.js` *(Crear carpeta `hooks` si no está)* | Gestión reactiva de asientos, límites y sincronización en vivo. |
| **`Navbar.jsx`** | `src/components/Navbar.jsx` | Menú superior con la burbuja de carrito sincronizada. |
| **`LogoutModal.jsx`** | `src/components/LogoutModal.jsx` | Pop-up de confirmación de salida. |
| **`MatchBanner.jsx`** | `src/components/MatchBanner.jsx` | Banner con información del partido. |
| **`SeatsGrid.jsx`** | `src/components/SeatsGrid.jsx` | Contenedor de la grilla de asientos. |
| **`SeatButton.jsx`** | `src/components/SeatButton.jsx` | Botón individual del asiento (deshabilita si está ocupado). |
| **`SummaryPanel.jsx`** | `src/components/SummaryPanel.jsx` | Panel derecho de resumen de asientos seleccionados y valor total. |

---

## 2. Dónde Ubicar los Estilos y las Imágenes (Assets)

Vite sirve la carpeta `public` directamente como ruta raíz (`/`). Como tu compañera ya creó `public/assets` y `public/css`, debés colocar allí las imágenes y estilos para que los componentes los encuentren:

1.  **Imágenes de Banderas y Logos**:
    *   Copiá la carpeta antigua de imágenes `assets/img/` a ➡️ `public/assets/img/`
    *   Copiá las banderas `assets/flags/` a ➡️ `public/assets/flags/`
    *(De este modo, tu componente `<MatchBanner />` y el logo del `<Navbar />` podrán acceder a ellos usando rutas relativas directas como `/assets/img/LogoTicketApp.png` o `/assets/flags/alemania.png`)*.

2.  **Estilos globales (`styles.css`)**:
    *   Colocá tu archivo `styles.css` en ➡️ `public/css/styles.css`
    *   Para integrarlo al proyecto completo, basta con que agreguen la siguiente etiqueta `<link>` en el archivo principal `index.html` (ubicado en la raíz de `ticketapp-react`):
        ```html
        <link rel="stylesheet" href="/css/styles.css" />
        ```
        O bien que lo importen directamente en `src/main.jsx` escribiendo:
        ```javascript
        import '../public/css/styles.css';
        ```

---

## 3. Integración en el Enrutador Grupal (`App.jsx`)

Para que el proyecto muestre tu pantalla al navegar a la ruta `/asientos`, debés pedirle a tu compañera encargada del enrutador (o agregarlo vos misma en `src/App.jsx`) que registre el componente:

```jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Estadio from './pages/Estadio';
import SeatsScreen from './pages/SeatsScreen'; // Tu página importada
import Carrito from './pages/Carrito';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/estadio" element={<Estadio />} />
        {/* Tu ruta de asientos */}
        <Route path="/asientos" element={<SeatsScreen />} />
        <Route path="/carrito" element={<Carrito />} />
      </Routes>
    </Router>
  );
}

export default App;
```

---

## 4. Adaptaciones Modernas en la SPA

Una vez que tu compañera integre el ruteador oficial (`react-router-dom`):
1.  **Cambio de `location.search`**: En `src/pages/SeatsScreen.jsx`, podés reemplazar la lectura nativa por `useSearchParams()` de React Router.
2.  **Cambio a `useNavigate`**: En vez de usar `window.location.href = ...`, usá `const navigate = useNavigate()` y hacé `navigate('/carrito')` para no refrescar la página.

*(Los archivos que te guardé en `migration_react_asientos/` están listos para ser copiados y pegados inmediatamente en los directorios de `ticketapp-react`)*.
