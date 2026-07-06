/**
 * Fuente ÚNICA de datos de partidos (Dieciseisavos, Mundial 2026).
 *
 * IMPORTANTE: este archivo reemplaza 2 fuentes de datos distintas que habían
 * surgido en el merge (src/data/matches.js de Home/Login y src/data/partidos.js
 * de Partidos/Estadio) porque tenían partidos y IDs incompatibles entre sí.
 * Los datos de acá son los reales de frontend/js/modules/matches.js
 * (DEFAULT_MATCHES['16avos']) del proyecto original — los mismos que ya usa
 * utils/matchInfo.js y MatchBanner.jsx del lado del carrito, así que con esto
 * TODA la app (Home, Partidos, Estadio, Asientos, Carrito) habla de los
 * mismos partidos con el mismo id numérico (1-16).
 *
 * Campos agregados sobre el original para que encajen con lo que ya
 * construyeron Partidos.jsx/MatchCard.jsx (fase, ciudad, precio, disponible):
 *  - fase: por ahora todos son "Octavos" (no migramos 8avos/4tos/semis/final,
 *    ya que Asientos/Carrito solo tienen datos de sectores para esta fase).
 *  - precio: precio "desde" = el más barato de los 4 sectores (ver
 *    DEFAULT_SECTOR_PRICES en el original: norte/sur 250000, platea 300000,
 *    palco 500000) → se usa 250000 como base para todos.
 *  - disponible: true para todos (venta abierta).
 */
const DEFAULT_MATCHES_16AVOS = [
  { id: 1, home: { name: "Alemania", flag: "de" }, away: { name: "Paraguay", flag: "py" }, date: "Lunes, 29 jun", time: "15:00 HS.", stadium: "MetLife Stadium", city: "East Rutherford, EE.UU." },
  { id: 2, home: { name: "Francia", flag: "fr" }, away: { name: "Suecia", flag: "se" }, date: "Lunes, 29 jun", time: "19:00 HS.", stadium: "Rose Bowl", city: "Pasadena, EE.UU." },
  { id: 3, home: { name: "Sudáfrica", flag: "za" }, away: { name: "Canadá", flag: "ca" }, date: "Martes, 30 jun", time: "13:00 HS.", stadium: "AT&T Stadium", city: "Arlington, EE.UU." },
  { id: 4, home: { name: "Países Bajos", flag: "nl" }, away: { name: "Marruecos", flag: "ma" }, date: "Martes, 30 jun", time: "19:00 HS.", stadium: "Levi's Stadium", city: "Santa Clara, EE.UU." },
  { id: 5, home: { name: "Portugal", flag: "pt" }, away: { name: "Croacia", flag: "hr" }, date: "Miércoles, 1 jul", time: "13:00 HS.", stadium: "Hard Rock Stadium", city: "Miami Gardens, EE.UU." },
  { id: 6, home: { name: "España", flag: "es" }, away: { name: "Austria", flag: "at" }, date: "Miércoles, 1 jul", time: "19:00 HS.", stadium: "Estadio Azteca", city: "Ciudad de México, México" },
  { id: 7, home: { name: "Estados Unidos", flag: "us" }, away: { name: "Bosnia y Herz.", flag: "ba" }, date: "Jueves, 2 jul", time: "13:00 HS.", stadium: "SoFi Stadium", city: "Inglewood, EE.UU." },
  { id: 8, home: { name: "Bélgica", flag: "be" }, away: { name: "Senegal", flag: "sn" }, date: "Jueves, 2 jul", time: "19:00 HS.", stadium: "Estadio Akron", city: "Guadalajara, México" },
  { id: 9, home: { name: "Brasil", flag: "br" }, away: { name: "Japón", flag: "jp" }, date: "Viernes, 3 jul", time: "13:00 HS.", stadium: "AT&T Stadium", city: "Arlington, EE.UU." },
  { id: 10, home: { name: "Costa de Marfil", flag: "ci" }, away: { name: "Noruega", flag: "no" }, date: "Viernes, 3 jul", time: "19:00 HS.", stadium: "Lumen Field", city: "Seattle, EE.UU." },
  { id: 11, home: { name: "México", flag: "mx" }, away: { name: "Ecuador", flag: "ec" }, date: "Sábado, 4 jul", time: "13:00 HS.", stadium: "Estadio Azteca", city: "Ciudad de México, México" },
  { id: 12, home: { name: "Inglaterra", flag: "gb-eng" }, away: { name: "Rep. del Congo", flag: "cg" }, date: "Sábado, 4 jul", time: "19:00 HS.", stadium: "MetLife Stadium", city: "East Rutherford, EE.UU." },
  { id: 13, home: { name: "Argentina", flag: "ar" }, away: { name: "Cabo Verde", flag: "cv" }, date: "Domingo, 5 jul", time: "13:00 HS.", stadium: "Hard Rock Stadium", city: "Miami Gardens, EE.UU." },
  { id: 14, home: { name: "Australia", flag: "au" }, away: { name: "Egipto", flag: "eg" }, date: "Domingo, 5 jul", time: "19:00 HS.", stadium: "Rose Bowl", city: "Pasadena, EE.UU." },
  { id: 15, home: { name: "Suiza", flag: "ch" }, away: { name: "Argelia", flag: "dz" }, date: "Lunes, 6 jul", time: "13:00 HS.", stadium: "Gillette Stadium", city: "Foxborough, EE.UU." },
  { id: 16, home: { name: "Colombia", flag: "co" }, away: { name: "Ghana", flag: "gh" }, date: "Lunes, 6 jul", time: "19:00 HS.", stadium: "SoFi Stadium", city: "Inglewood, EE.UU." },
];

const DEFAULT_MATCHES_8AVOS = [
  { id: 17, home: { name: "Brasil", flag: "br" }, away: { name: "Noruega", flag: "no" }, date: "Domingo, 5 jul", time: "17:00 HS.", stadium: "New York New Jersey Stadium", city: "East Rutherford, EE.UU.", disponible: true },
  { id: 18, home: { name: "México", flag: "mx" }, away: { name: "Inglaterra", flag: "gb-eng" }, date: "Domingo, 5 jul", time: "21:00 HS.", stadium: "Estadio Azteca", city: "Ciudad de México, México", disponible: true },
  { id: 19, home: { name: "Portugal", flag: "pt" }, away: { name: "España", flag: "es" }, date: "Lunes, 6 jul", time: "16:00 HS.", stadium: "Dallas Stadium", city: "Dallas, EE.UU.", disponible: true },
  { id: 20, home: { name: "Estados Unidos", flag: "us" }, away: { name: "Bélgica", flag: "be" }, date: "Lunes, 6 jul", time: "21:00 HS.", stadium: "Seattle Stadium", city: "Seattle, EE.UU.", disponible: true },
  { id: 21, home: { name: "Argentina", flag: "ar" }, away: { name: "Egipto", flag: "eg" }, date: "Martes, 7 jul", time: "13:00 HS.", stadium: "Atlanta Stadium", city: "Atlanta, EE.UU.", disponible: true },
  { id: 22, home: { name: "Suiza", flag: "ch" }, away: { name: "Colombia", flag: "co" }, date: "Martes, 7 jul", time: "16:00 HS.", stadium: "BC Place", city: "Vancouver, Canadá", disponible: true },
];

const DEFAULT_MATCHES_4TOS = [
  { id: 25, home: { name: "Francia", flag: "fr" }, away: { name: "Marruecos", flag: "ma" }, date: "Jueves, 9 jul", time: "17:00 HS.", stadium: "Boston Stadium", city: "Boston, EE.UU.", disponible: true },
  { id: 26, home: { name: 'Gan. Partido 19', flag: 'placeholder' }, away: { name: 'Gan. Partido 20', flag: 'placeholder' }, date: 'Domingo, 19 jul', time: '15:00 HS.', stadium: 'Rose Bowl', city: 'Pasadena, EE.UU.', disponible: false },
  { id: 27, home: { name: 'Gan. Partido 21', flag: 'placeholder' }, away: { name: 'Gan. Partido 22', flag: 'placeholder' }, date: 'Domingo, 19 jul', time: '19:00 HS.', stadium: 'AT&T Stadium', city: 'Arlington, EE.UU.', disponible: false },
  { id: 28, home: { name: 'Gan. Partido 23', flag: 'placeholder' }, away: { name: 'Gan. Partido 24', flag: 'placeholder' }, date: 'Lunes, 20 jul', time: '19:00 HS.', stadium: 'Hard Rock Stadium', city: 'Miami Gardens, EE.UU.', disponible: false },
];

const DEFAULT_MATCHES_SEMIFINAL = [
  { id: 29, home: { name: 'Gan. Cuartos 1', flag: 'placeholder' }, away: { name: 'Gan. Cuartos 2', flag: 'placeholder' }, date: 'Martes, 23 jul', time: '19:00 HS.', stadium: 'MetLife Stadium', city: 'East Rutherford, EE.UU.', disponible: false },
  { id: 30, home: { name: 'Gan. Cuartos 3', flag: 'placeholder' }, away: { name: 'Gan. Cuartos 4', flag: 'placeholder' }, date: 'Miércoles, 24 jul', time: '19:00 HS.', stadium: 'Rose Bowl', city: 'Pasadena, EE.UU.', disponible: false },
];

const DEFAULT_MATCHES_FINAL = [
  { id: 31, home: { name: 'Gan. Semifinal 1', flag: 'placeholder' }, away: { name: 'Gan. Semifinal 2', flag: 'placeholder' }, date: 'Domingo, 27 jul', time: '18:00 HS.', stadium: 'MetLife Stadium', city: 'East Rutherford, EE.UU.', disponible: false },
];

function cargarOverride() {
  try {
    const overridden = JSON.parse(localStorage.getItem("MATCHES"));
    if (overridden && Array.isArray(overridden["16avos"])) {
      return overridden["16avos"];
    }
  } catch {
    // seguimos con el default
  }
  return null;
}

// Convierte "Lunes, 29 jun" / "Miércoles, 1 jul" -> "2026-06-29" / "2026-07-01"
// (necesario porque MatchCard.jsx hace new Date(fecha + "T12:00:00") para
// mostrar la fecha formateada en la lista de Partidos).
function aFechaISO(dateStr) {
  const meses = { ene: "01", feb: "02", mar: "03", abr: "04", may: "05", jun: "06",
    jul: "07", ago: "08", sep: "09", oct: "10", nov: "11", dic: "12" };
  const match = dateStr.match(/(\d+)\s+(\w+)/);
  if (!match) return "2026-06-29";
  const [, dia, mesAbrev] = match;
  const mes = meses[mesAbrev.toLowerCase()] || "06";
  return `2026-${mes}-${dia.padStart(2, "0")}`;
}

/**
 * Lista "plana" de partidos, con los campos que necesitan Partidos.jsx y
 * MatchCard.jsx (fase/local/visitante/fecha/hora/estadio/ciudad/precio/
 * disponible) ADEMÁS de los campos originales anidados (home/away con
 * flag) que necesita el carrusel de Home.
 */
const partidos16 = (cargarOverride() || DEFAULT_MATCHES_16AVOS).map((m) => ({
  id: m.id,
  home: m.home,
  away: m.away,
  date: m.date,
  time: m.time,
  stadium: m.stadium,
  city: m.city,
  // Campos planos para Partidos.jsx / MatchCard.jsx / Estadio.jsx
  fase: "16avos",
  local: m.home.name,
  visitante: m.away.name,
  fecha: aFechaISO(m.date), // ISO, para new Date() en MatchCard.jsx
  hora: m.time.replace(" HS.", ""),
  estadio: m.stadium,
  ciudad: m.city,
  precio: 250000,
  price: `Desde $${(250000).toLocaleString("es-AR")}`,
  disponible: true,
}));

const partidos8 = DEFAULT_MATCHES_8AVOS.map((m) => ({
  id: m.id,
  home: m.home,
  away: m.away,
  date: m.date,
  time: m.time,
  stadium: m.stadium,
  city: m.city,
  fase: "8vos",
  local: m.home.name,
  visitante: m.away.name,
  fecha: aFechaISO(m.date),
  hora: m.time.replace(" HS.", ""),
  estadio: m.stadium,
  ciudad: m.city,
  precio: 250000,
  price: `Desde $${(250000).toLocaleString("es-AR")}`,
  disponible: m.disponible !== false,
}));

const partidos4 = DEFAULT_MATCHES_4TOS.map((m) => ({
  id: m.id,
  home: m.home,
  away: m.away,
  date: m.date,
  time: m.time,
  stadium: m.stadium,
  city: m.city,
  fase: "4tos",
  local: m.home.name,
  visitante: m.away.name,
  fecha: aFechaISO(m.date),
  hora: m.time.replace(" HS.", ""),
  estadio: m.stadium,
  ciudad: m.city,
  precio: 250000,
  price: `Desde $${(250000).toLocaleString("es-AR")}`,
  disponible: m.disponible !== false,
}));

const partidosSemi = DEFAULT_MATCHES_SEMIFINAL.map((m) => ({
  id: m.id,
  home: m.home,
  away: m.away,
  date: m.date,
  time: m.time,
  stadium: m.stadium,
  city: m.city,
  fase: "Semis",
  local: m.home.name,
  visitante: m.away.name,
  fecha: aFechaISO(m.date),
  hora: m.time.replace(" HS.", ""),
  estadio: m.stadium,
  ciudad: m.city,
  precio: 250000,
  price: `Desde $${(250000).toLocaleString("es-AR")}`,
  disponible: m.disponible !== false,
}));

const partidosFinal = DEFAULT_MATCHES_FINAL.map((m) => ({
  id: m.id,
  home: m.home,
  away: m.away,
  date: m.date,
  time: m.time,
  stadium: m.stadium,
  city: m.city,
  fase: "Final",
  local: m.home.name,
  visitante: m.away.name,
  fecha: aFechaISO(m.date),
  hora: m.time.replace(" HS.", ""),
  estadio: m.stadium,
  ciudad: m.city,
  precio: 250000,
  price: `Desde $${(250000).toLocaleString("es-AR")}`,
  disponible: m.disponible !== false,
}));

const partidos = [...partidos16, ...partidos8, ...partidos4, ...partidosSemi, ...partidosFinal];

export const FASES = ["16avos", "8vos", "4tos", "Semis", "Final"];

export default partidos;
