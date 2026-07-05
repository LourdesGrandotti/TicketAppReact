# Migración de Asientos a React — Documentación de Implementación

**Responsable:** Grandotti Lourdes Priscila  
**Proyecto grupal:** TicketApp — Migración a React (Vite + React Router + Context API)  
**Fecha:** Julio 2026

---

## 1. Contexto y Objetivo

La pantalla de selección de asientos fue originalmente construida en Vanilla JavaScript en tres archivos:

| Archivo original | Líneas | Responsabilidad |
|---|---|---|
| `frontend/asientos.html` | ~120 | Estructura HTML de la grilla y panel lateral |
| `frontend/js/asientos.js` | ~156 | Inicialización de la vista, eventos del DOM |
| `frontend/js/modules/seating.js` | ~501 | Lógica central: generar asientos, selección, límites, sync multi-pestaña |

**Objetivo:** Convertir esta funcionalidad en componentes React reutilizables, conectados al `CartContext` compartido del proyecto grupal, usando React Router para navegación.

---

## 2. Decisiones de Diseño

### 2.1 Por qué NO duplicar Navbar y Footer

El plan original generado por IA sugería crear un `Navbar.jsx` propio dentro de la carpeta de asientos. Esto **se descartó** porque:

- El proyecto grupal ya tiene `src/components/Navbar.jsx` y `Footer.jsx` integrados en `App.jsx`
- Duplicarlos causaría **dos navbars** en pantalla
- El Navbar del proyecto ya usa `AuthContext` y `CartContext` correctamente

### 2.2 Por qué NO usar `sessionStorage` como fuente de verdad

El hook original guardaba las selecciones en `sessionStorage`. Esto **se reemplazó** por:

- **`CartContext` como fuente de verdad única** → los asientos viven en el carrito global
- `CartContext` ya persiste en `localStorage` → sobreviven la navegación a `/carrito`
- Evita duplicar estado y mantiene consistencia con el resto de la app

### 2.3 Por qué usar `useSearchParams` y `useNavigate`

| Código original (Vanilla JS) | Código React migrado |
|---|---|
| `new URLSearchParams(window.location.search)` | `const [searchParams] = useSearchParams()` |
| `window.location.href = '/carrito'` | `navigate('/carrito')` |

Usar `window.location` en una SPA provoca **recarga completa** y destruye el estado de todos los contextos.

### 2.4 Sincronización multi-pestaña (conservada)

Se conservó `localStorage['ticketapp_asientos_seleccionados']` con el evento `storage` del navegador para simular concurrencia entre pestañas.

---

## 3. Arquitectura y Flujo de Datos

```
/asientos?sector=A1&partido=13&cant=3
              │
              ▼
        Asientos.jsx  (src/pages/)
        ├── useSearchParams()  → sector, partido, cant
        ├── useSeating(sector, partido, limit)
        │     ├── CartContext  ← fuente de verdad
        │     ├── generateSeats()  ← grilla 8×6 = 48 asientos
        │     ├── localStorage sync  ← multi-tab
        │     └── { seats, selectedSeats, alerta, toggleSeat, removeSeat, clearSelections }
        ├── MatchBanner  → info del partido + banderas
        ├── SeatsGrid → SeatButton ×48
        └── SummaryPanel → total + navigate('/carrito')
```

### Ciclo de selección de un asiento

```
Click SeatButton
  └→ toggleSeat(idAsiento)
       ├── Verifica: estado !== 'ocupado', no supera límite
       └→ persistSelections()
            ├── CartContext.agregarItem({ tipo:'asiento', precio, ... })
            ├── localStorage sync → notifica otras pestañas vía evento 'storage'
            └→ Re-render global:
                  → Navbar badge se incrementa
                  → SummaryPanel muestra asiento y total actualizado
```

---

## 4. Archivos Creados/Modificados

```
src/
├── pages/
│   └── Asientos.jsx          ← CREADO — Página principal migrada
├── hooks/
│   └── useSeating.js         ← CREADO — Lógica central (CartContext + multi-tab sync)
├── components/
│   ├── MatchBanner.jsx       ← CREADO — Banner del partido con banderas
│   ├── SeatsGrid.jsx         ← CREADO — Grilla visual de asientos por fila
│   ├── SeatButton.jsx        ← CREADO — Botón individual de asiento
│   └── SummaryPanel.jsx      ← CREADO — Panel lateral: lista + total + continuar
└── context/
    └── CartContext.jsx       ← MODIFICADO — Agrega sync con sessionStorage
```

> Los archivos de `migration_react_asientos/` son referencia histórica —no se usan en el proyecto final.

---

## 5. Descripción de Cada Componente

### `src/pages/Asientos.jsx`

Página principal. Lee los parámetros de URL con `useSearchParams`, calcula el límite de asientos (entre 1 y 4), y orquesta los subcomponentes. No tiene Navbar ni Footer propios — ya vienen de `App.jsx`.

**Parámetros de URL aceptados:**

| Parámetro | Ejemplo | Descripción |
|---|---|---|
| `sector` | `A1` | Código del sector del estadio |
| `partido` | `13` | ID del partido |
| `cant` | `3` | Cantidad de asientos permitidos (clampeado 1–4) |

---

### `src/hooks/useSeating.js`

Hook central. Deriva las selecciones actuales directamente desde `CartContext` (sin duplicar en `useState`), genera el mapa de 48 asientos (8 filas × 6), calcula precios por zona y sincroniza multi-pestaña.

**Precios configurados por zona de estadio:**

```js
const PRECIOS_POR_ZONA = {
  A: 270000,   // Platea preferencial
  B: 180000,   // Platea popular
  C: 140000,   // Tribuna alta
  D: 350000,   // Palco VIP
};
```

**Firma:** `useSeating(sectorId, partidoId, initialLimit)`  
**Retorna:** `{ seats, selectedSeats, alerta, toggleSeat, removeSeat, clearSelections }`

---

### `src/components/MatchBanner.jsx`

Banner rojo con la información del partido. Lee los partidos desde `localStorage['MATCHES']` (puede haberlo seteado la página Partidos del grupo) o usa lista hardcodeada de 16 partidos como fallback. Usa el CDN `flag-icons` (clase `fi fi-ar`) para mostrar banderas por código ISO del país.

---

### `src/components/SeatsGrid.jsx`

Renderiza los asientos agrupados por fila, usando clases CSS del `styles.css` original: `.grilla-asientos`, `.fila-asientos`, `.etiqueta-fila`. El efecto de perspectiva 3D (tribuna inclinada) viene del CSS existente.

---

### `src/components/SeatButton.jsx`

Botón individual. Aplica clases CSS según el estado:

| Estado | Clase CSS | Visual |
|---|---|---|
| `disponible` | `btn-disponible` | Azul celeste, clickeable |
| `seleccionado` | `btn-seleccionado` | Rojo, click para deseleccionar |
| `ocupado` | `btn-ocupado` + `disabled` | Gris, no clickeable |

---

### `src/components/SummaryPanel.jsx`

Panel lateral derecho. Muestra la tabla de asientos elegidos con precio unitario, calcula el total en tiempo real y provee el botón "Continuar". Usa boxicons (`bx-trash`) para quitar asientos (CDN ya en `index.html`).

---

### `src/context/CartContext.jsx` *(modificado)*

Se agregó sincronización al `useEffect` existente para mantener `sessionStorage` actualizado:

```js
useEffect(() => {
  localStorage.setItem("carrito", JSON.stringify(items));

  // Mantiene sessionStorage actualizado para sync multi-pestaña
  const seatsInCart = items
    .filter((item) => item.tipo === "asiento")
    .map((item) => item.id);
  sessionStorage.setItem(
    "ticketapp_mis_asientos_seleccionados",
    JSON.stringify(seatsInCart)
  );
}, [items]);
```

---

## 6. Estructura de un Item de Asiento en CartContext

Cuando se selecciona un asiento se agrega al carrito compartido con esta forma:

```js
{
  id: "A1-3-5",                             // ID único global del asiento
  nombre: "Sector A1 — Fila 3, Asiento 5",  // Descripción legible para el carrito
  precio: 270000,                            // Calculado según zona A/B/C/D
  tipo: "asiento",                           // Permite distinguirlo de otros ítems
  partidoId: "13",                           // Permite filtrar por partido
  sector: "A1",
  fila: "3",
  numero: 5
}
```

---

## 7. CSS — Reutilización Total (sin código nuevo)

No se escribió CSS nuevo. Se reutiliza completamente `public/css/styles.css`:

| Clase CSS | Componente | Propósito |
|---|---|---|
| `.ta-match-bar`, `.ta-bar-inner` | MatchBanner | Banner rojo del partido |
| `.ta-flag-img`, `.ta-bar-vs` | MatchBanner | Banderas y separador VS |
| `.ta-sec-header`, `.ta-sector-titulo` | Asientos.jsx | Encabezado con sector |
| `.ta-btn-volver` | Asientos.jsx | Botón volver al estadio |
| `.ta-main` | Asientos.jsx | Layout de dos columnas |
| `.ta-panel-col` | SummaryPanel | Columna derecha del resumen |
| `.grilla-asientos`, `.fila-asientos`, `.etiqueta-fila` | SeatsGrid | Grilla con perspectiva 3D |
| `.btn-asiento`, `.btn-disponible`, `.btn-seleccionado`, `.btn-ocupado` | SeatButton | Estados visuales |
| `.ta-table-hdr`, `.ta-detalle-fila`, `.ta-total-line` | SummaryPanel | Tabla de resumen |
| `.ta-btn-continuar`, `.ta-continuar-wrap` | SummaryPanel | Botón de acción |
| `.ta-legend`, `.ta-legend-item`, `.ta-leg-box` | Asientos.jsx | Leyenda de colores |

---

## 8. Lo que Pedí a la IA y Qué Descarté

### Lo que generó la IA (`migration_react_asientos/`)
Una versión funcional pero **standalone** —autónoma, sin integración al proyecto grupal.

### Lo que descarté y por qué

| Descarte | Razón técnica |
|---|---|
| `Navbar.jsx` y `LogoutModal.jsx` propios | Ya existen en el proyecto; duplicarlos rompe el layout |
| `sessionStorage` como fuente de verdad | Desincroniza el carrito del resto de la app |
| `window.location.href` para navegar | Recarga completa = destruye todos los contextos React |
| `PropTypes` | No está instalado en el proyecto base del grupo |
| Footer propio dentro de la página | Ya viene de `App.jsx` |

### Lo que investigué para que funcione
- Cómo usar `useSearchParams` (React Router v7) para leer URL params reactivamente
- Cómo *derivar* estado desde un Context sin duplicarlo en `useState` local
- El evento `storage` del navegador para sync entre pestañas abiertas
- Cómo estructurar ítems en `CartContext` con campo `tipo` para distinguirlos

### La parte más difícil de traducir a React

**Conectar `useSeating` con `CartContext`.** En Vanilla JS el estado de selecciones vivía en variables del módulo y se actualizaba con mutaciones del DOM. En React había que decidir quién *posee* ese estado.

Se eligió `CartContext` como fuente de verdad porque los asientos tienen que sobrevivir la navegación hacia `/carrito`. Con `useState` local el estado se destruía al cambiar de página y el carrito aparecía vacío.

---

## 9. Cómo Probar la Implementación

```bash
# Terminal 1 — Backend (Express + MongoDB)
cd backend && npm run dev     # http://localhost:3000

# Terminal 2 — Frontend (Vite + React)
npm run dev                   # http://localhost:5173 o 5174
```

URL de prueba: `http://localhost:5173/asientos?sector=A1&partido=13&cant=3`

**Casos de prueba:**
- ✅ Seleccionar hasta 3 asientos → aparecen en panel lateral con precio unitario
- ✅ Intentar seleccionar un 4.° → alerta "Límite alcanzado"
- ✅ Quitar desde el panel lateral → se deselecciona en la grilla
- ✅ Badge del carrito en Navbar se actualiza en tiempo real
- ✅ Botón "Continuar" → navega a `/carrito?partido=13` sin recarga de página
- ✅ Botón "Volver" → limpia selecciones y navega a `/estadio?partido=13`
- ✅ Dos pestañas abiertas: seleccionar en una → aparece ocupado en la otra

---

## 10. Dependencias

| Dependencia | Origen | Para qué se usa |
|---|---|---|
| `react-router-dom` ^7.x | npm | `useSearchParams`, `useNavigate` |
| `bootstrap` ^5.x | npm | Clases de grid y alertas |
| Boxicons 2.1.4 | CDN en `index.html` | Íconos (`bx-chevron-left`, `bx-trash`) |
| Flag Icons 7.0.0 | CDN en `index.html` | Banderas en MatchBanner (`fi fi-ar`) |
| Montserrat | CDN en `index.html` | Tipografía principal |
| Nulshock | CDN en `index.html` | Títulos de sector en encabezado |

> Los CDNs están declarados en `index.html` (raíz del proyecto). No requieren instalación adicional con npm.
