# Migración a React — Home, Login y Registro

Documentación de mi parte de la migración (Home + Login + Registro), para el informe grupal.

## Páginas migradas

- `src/pages/Home.jsx`
- `src/pages/Login.jsx`
- `src/pages/Registro.jsx`

## Archivos nuevos creados

- `src/data/matches.js` — dataset de los próximos partidos que se muestran en el carrusel de Home.
- `src/components/MatchCard.jsx` — card de partido, extraída para no duplicar JSX entre las 5 tarjetas del carrusel.
- `src/components/PasswordInput.jsx` — input de contraseña con botón de mostrar/ocultar, reutilizado en Login y en los dos pasos de Registro.

## Archivos compartidos modificados (avisado en el grupo antes de tocarlos)

- `src/context/AuthContext.jsx` — se implementó el `login()` real contra el backend (antes era un mock), y se confirmó el nombre del campo de rol (`rol`, con valores `"admin"` / `"user"`), que estaba pendiente como TODO.

---

## Home (`src/pages/Home.jsx`)

### Qué le pedí a la IA y qué descarté

Mi plan inicial era resolver el hero + carrusel con dos variantes separadas (`HomeLogueado` / `HomeInvitado`), asumiendo que `index.html` y `home.html` tenían contenido distinto (así lo describí al principio). Al comparar los dos HTML originales con la IA, se descubrió que **el hero y el carrusel son literalmente el mismo markup en ambos archivos** — lo único que cambia es el navbar (ya resuelto en `Navbar.jsx` vía `AuthContext`) y el destino de algunos links según haya sesión o no. Descarté el enfoque de dos componentes separados y usé un solo `Home.jsx` con el destino de los links calculado según `usuario` del `AuthContext`.

### Qué tuve que investigar/entender

- **Los datos del carrusel eran inconsistentes entre fuentes.** El HTML estático tenía 5 partidos hardcodeados a mano (Sudáfrica vs Canadá, Brasil vs Japón, etc.), mientras que `main.js` los pisaba en runtime con un dataset totalmente distinto (Alemania vs Paraguay, Francia vs Suecia, etc.). Al abrir el proyecto original con Live Server confirmé que lo que realmente se ve es el HTML hardcodeado (el `main.js` no estaba pisando el carrusel como se esperaba, probablemente por el orden/tipo de carga de los scripts). Terminé usando los 5 partidos hardcodeados como fuente de verdad en `src/data/matches.js`, para que el resultado visual sea idéntico al original.
- El botón "Comprar entradas" y el link de "ticket" de cada card originalmente se resolvían con JS puro pisando `href` (`script.js`) o generando el `targetUrl` en un template string (`main.js`). En React esto se resuelve calculando el destino (`usuario ? "/partidos" : "/login"`) directamente en el render, sin manipular el DOM.
- La lógica de scroll del carrusel (`script.js`: avanzar/retroceder, ocultar el botón izquierdo al inicio) se portó a `useRef` + `useState` en vez de `querySelector`/`classList`.

### Qué fue lo más difícil de traducir

Distinguir qué HTML era el que realmente se renderizaba (el estático vs. el generado por JS) — ambos coexistían en el proyecto original y hacían prácticamente lo mismo con datos distintos. Sin comparar ambos archivos lado a lado hubiera migrado el dataset equivocado.

### Pendiente / no migrado

- `index-auth.js` (guard de redirección si ya había sesión activa) **no se portó a propósito**: existía porque `index.html` y `home.html` eran páginas físicas separadas de las que había que "escapar". Con `App.jsx` usando una sola ruta `/` para ambos casos, el problema que resolvía ese script ya no existe en la nueva arquitectura.

---

## Login y Registro (`src/pages/Login.jsx`, `src/pages/Registro.jsx`)

### Qué le pedí a la IA y qué descarté

- Le pedí portar `login.js` (313 líneas, maneja login + registro multi-paso + toggle de contraseña) a los dos componentes ya armados en el esqueleto.
- Descarté seguir usando `window.location.href` para las redirecciones (login exitoso, registro exitoso, click en el logo) y las reemplacé por `navigate()` de `react-router-dom`, como indicaba el propio comentario TODO del archivo `Login.jsx` del esqueleto.
- Descarté manejar el paso 1/paso 2 del registro con clases CSS (`d-none`) como en el original, y usé un estado `paso` (1 o 2) que decide qué bloque de JSX renderizar.
- Inicialmente armé el fetch al backend "a mano" (replicando `login.js` tal cual), pero luego lo reemplacé por `usuariosService.listar()` / `.crear()` una vez que conseguí ese archivo, tal como pide el README ("no reescribir el backend").

### Qué tuve que investigar/entender

- **El campo de rol real es `rol`** (`"admin"` / `"user"`), confirmado en `login.js`. Esto cerraba un TODO pendiente en `AuthContext.jsx` (`esAdmin`).
- **Conflicto de layout no evidente al leer solo el HTML de Login/Registro**: `Navbar` está montado globalmente en `App.jsx`, arriba de `<Routes>`, así que aparece en todas las páginas — incluidas login/registro, que en el diseño original tienen su propio header oscuro sin navbar compartido. Lo mismo se detectó después para `/admin`, que tampoco usa el navbar compartido. Esto llevó a proponer un cambio en `App.jsx` (ver más abajo).
- **Limitación de `api.js`**: `apiFetch` lanza una excepción genérica apenas `res.ok` es `false`, sin exponer el body de la respuesta. Esto significa que si el backend devuelve un error de validación (ej. email duplicado) en el paso 2 del registro, se pierde el mensaje real y se muestra un texto genérico de "no se pudo conectar". Se documentó como comentario en el código y se planteó como posible mejora a `api.js` para el grupo, sin modificarlo unilateralmente.

### Qué fue lo más difícil de traducir a componentes/estado

El formulario multi-paso de Registro: en el original, "paso 1" y "paso 2" son dos `<div>` que se muestran/ocultan con `classList`, y la transición actualiza a mano las clases del sidebar y los textos del encabezado en varios elementos sueltos del DOM. Convertir eso a JSX declarativo implicó centralizar todo en un solo estado (`paso`) y condicionar el render completo (sidebar, encabezado, y el bloque de campos correspondiente) a partir de ese único valor, en vez de tocar clases una por una.

### Pendiente / no resuelto en esta rama

- **`App.jsx` (layout de Navbar/Footer)**: planteado en el grupo, no aplicado todavía por ser un archivo compartido. Se armaron 3 layouts (`MainLayout`, `AuthLayout`, `AdminLayout` con `<Outlet />`) como propuesta de solución, pendientes de revisión/merge por el equipo.
- **`api.js` (manejo de errores de `apiFetch`)**: planteado como mejora posible, no modificado.
- Ajustes visuales de botones mencionados aparte (pendientes, a cargo mío en un commit posterior).

---

## Resumen de decisiones técnicas clave

| Decisión | Alternativa descartada | Motivo |
|---|---|---|
| Un solo `Home.jsx` con links condicionales | `HomeLogueado`/`HomeInvitado` separados | El contenido real (hero, carrusel) es idéntico; solo cambian destinos de link |
| Dataset hardcodeado de partidos en `src/data/matches.js` | Dataset de `main.js` (`DEFAULT_MATCHES`) | El HTML estático es lo que realmente se ve en el navegador |
| `usuariosService` en vez de `fetch` directo | Replicar `login.js` tal cual con `fetch` crudo | El README pide no reescribir/duplicar llamadas al backend |
| Estado `paso` (1/2) para Registro | Clases CSS `d-none` como el original | Más declarativo y alineado con el modelo de React |
| Layouts anidados (`Outlet`) propuestos para `App.jsx` | Array de rutas + `useLocation` | Escalan mejor al aparecer una 3ª variante de header (Admin) |
