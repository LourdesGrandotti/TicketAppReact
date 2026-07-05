# Migración Partidos y Estadio a React

## ¿Qué se migró?

| HTML + JS original | Componente React |
|---|---|
| `partidos.html` + `matches.js` | `src/pages/Partidos.jsx` |
| `estadio.html` + `estadio-actions.js` + `matchInfo.js` | `src/pages/Estadio.jsx` |
| Lógica de tarjeta dentro de `matches.js` | `src/components/MatchCard.jsx` *(nuevo)* |
| Array de datos hardcodeado en `matches.js` | `src/data/partidos.js` *(nuevo)* |

---

## Archivos creados / modificados

```
src/
├── data/
│   └── partidos.js        ← NUEVO: mock de partidos (reemplaza al JSON embebido en matches.js)
├── components/
│   └── MatchCard.jsx      ← NUEVO: tarjeta de partido extraída de matches.js
├── pages/
│   ├── Partidos.jsx       ← MIGRADO
│   └── Estadio.jsx        ← MIGRADO
```

> **No se tocó** `App.jsx`, `Footer.jsx`, `Navbar.jsx` ni ninguna otra página.

---

## Decisiones clave

### 1. Datos → `src/data/partidos.js`

El HTML original tenía los datos de partidos mezclados dentro de `matches.js` (o llamados desde un JSON externo). Los movimos a un módulo independiente.

**Cuando el backend esté listo**, solo hay que cambiar esta línea en `Partidos.jsx`:

```js
// Antes (mock local):
import partidos from "../data/partidos.js";

// Después (API real):
const [partidos, setPartidos] = useState([]);
useEffect(() => {
  apiFetch("/partidos").then(setPartidos);
}, []);
```

---

### 2. Filtro de fase → `useSearchParams()`

En `matches.js` el filtro activo se leía así:

```js
// matches.js (vanilla JS)
const params = new URLSearchParams(window.location.search);
const fase = params.get("fase") ?? "Todos";
```

En React se reemplaza con `useSearchParams()` de react-router-dom:

```jsx
// Partidos.jsx (React)
const [searchParams, setSearchParams] = useSearchParams();
const faseActiva = searchParams.get("fase") ?? "Todos";
```

**Ventaja**: al cambiar la fase, la URL se actualiza (`/partidos?fase=Grupo`), así el usuario puede compartir o hacer back/forward conservando el filtro.

---

### 3. Tarjeta de partido → `<MatchCard />`

En `matches.js` la tarjeta se construía con template literals:

```js
// matches.js (vanilla JS) — patrón anti-DRY
card.innerHTML = `<div class="ta-match-card">…</div>`;
```

En React es un componente reutilizable con props tipadas:

```jsx
// MatchCard.jsx
function MatchCard({ partido }) { … }

// Partidos.jsx
{partidos.map((p) => <MatchCard key={p.id} partido={p} />)}
```

---

### 4. Navegación a Estadio → `useNavigate()`

En `estadio-actions.js` la navegación era:

```js
// estadio-actions.js (vanilla JS)
window.location.href = `estadio.html?id=${partido.id}`;
```

En React se reemplaza con `useNavigate()`:

```jsx
// MatchCard.jsx
const navigate = useNavigate();
navigate(`/estadio?id=${partido.id}`);
```

---

### 5. Lectura del partido en Estadio → `useSearchParams()`

En `matchInfo.js` se leía el partido así:

```js
// matchInfo.js (vanilla JS)
const id = new URLSearchParams(window.location.search).get("id");
const partido = partidos.find(p => p.id === id);
```

En React:

```jsx
// Estadio.jsx
const [searchParams] = useSearchParams();
const id = searchParams.get("id");
const partido = partidos.find((p) => p.id === id);
```

---

### 6. El Footer NO se repite en cada página

En el HTML original, el `<footer>` estaba copiado en cada `.html`. En React **ya está en `App.jsx`** una sola vez:

```jsx
// App.jsx (no cambiar)
<BrowserRouter>
  <Navbar />
  <Routes>…</Routes>
  <Footer />   {/* ← una sola vez, aplica a todas las páginas */}
</BrowserRouter>
```

> **Regla**: nunca importes ni renderices `<Footer />` dentro de una `page/`.

---

### 7. Botones rojos → siempre `btn btn-brand`

Todos los botones de acción primaria usan las mismas clases, sin inventar nuevas:

```jsx
// ✅ Correcto — igual que en Navbar.jsx
<button className="btn btn-brand rounded-pill fw-bold px-4 py-2">
  Comprar
</button>

// ❌ Incorrecto — no crear clases nuevas para esto
<button className="mi-boton-rojo-custom">Comprar</button>
```

La clase `btn-brand` está definida en `public/css/styles.css` y aplica el color `--primary` (#ed194d) con hover.

---

## Flujo completo del usuario

```
/partidos
  │  El usuario filtra por fase o busca un equipo
  │  Hace click en "Comprar" dentro de <MatchCard />
  │
  ▼
/estadio?id=ARG-MAR-01
  │  Estadio.jsx lee el id con useSearchParams()
  │  Muestra la barra de info y la imagen del estadio
  │  El usuario hace click en "Elegir asientos"
  │
  ▼
/asientos?id=ARG-MAR-01
  │  (Asientos.jsx pendiente de migrar)
```

---

## Próximo paso sugerido

Migrar `Asientos.jsx` (complejidad ALTA). Ese componente recibe el mismo `?id=` que Estadio y debería leer el partido con el mismo patrón:

```jsx
const [searchParams] = useSearchParams();
const partido = partidos.find(p => p.id === searchParams.get("id"));
```
