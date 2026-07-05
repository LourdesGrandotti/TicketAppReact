/**
 * Mock de partidos del Mundial 2026.
 * Cuando el backend exponga un endpoint real, reemplazar esta importación
 * por una llamada a apiFetch('/partidos') en Partidos.jsx.
 *
 * Campos de cada partido:
 *  - id        : identificador único (string)
 *  - fase      : "Grupo" | "Octavos" | "Cuartos" | "Semis" | "Final"
 *  - local     : nombre del equipo local
 *  - visitante : nombre del equipo visitante
 *  - fecha     : fecha ISO (YYYY-MM-DD)
 *  - hora      : hora local HH:MM
 *  - estadio   : nombre del estadio
 *  - ciudad    : ciudad sede
 *  - precio    : precio base de la entrada (número, en USD)
 *  - disponible: true → venta abierta; false → próximamente
 */
const partidos = [
  {
    id: "ARG-MAR-01",
    fase: "Grupo",
    local: "Argentina",
    visitante: "Marruecos",
    fecha: "2026-06-15",
    hora: "18:00",
    estadio: "MetLife Stadium",
    ciudad: "East Rutherford, NJ",
    precio: 180,
    disponible: true,
  },
  {
    id: "ESP-MEX-02",
    fase: "Grupo",
    local: "España",
    visitante: "México",
    fecha: "2026-06-16",
    hora: "15:00",
    estadio: "AT&T Stadium",
    ciudad: "Arlington, TX",
    precio: 150,
    disponible: true,
  },
  {
    id: "BRA-FRA-03",
    fase: "Grupo",
    local: "Brasil",
    visitante: "Francia",
    fecha: "2026-06-17",
    hora: "21:00",
    estadio: "SoFi Stadium",
    ciudad: "Inglewood, CA",
    precio: 200,
    disponible: true,
  },
  {
    id: "ALE-ITA-04",
    fase: "Octavos",
    local: "Alemania",
    visitante: "Italia",
    fecha: "2026-07-01",
    hora: "18:00",
    estadio: "Lumen Field",
    ciudad: "Seattle, WA",
    precio: 280,
    disponible: false,
  },
  {
    id: "ING-POR-05",
    fase: "Octavos",
    local: "Inglaterra",
    visitante: "Portugal",
    fecha: "2026-07-02",
    hora: "21:00",
    estadio: "Gillette Stadium",
    ciudad: "Foxborough, MA",
    precio: 320,
    disponible: false,
  },
  {
    id: "ARG-BRA-06",
    fase: "Cuartos",
    local: "Argentina",
    visitante: "Brasil",
    fecha: "2026-07-10",
    hora: "20:00",
    estadio: "Hard Rock Stadium",
    ciudad: "Miami Gardens, FL",
    precio: 500,
    disponible: false,
  },
  {
    id: "ESP-FRA-07",
    fase: "Semis",
    local: "España",
    visitante: "Francia",
    fecha: "2026-07-15",
    hora: "20:00",
    estadio: "MetLife Stadium",
    ciudad: "East Rutherford, NJ",
    precio: 750,
    disponible: false,
  },
  {
    id: "FINAL-08",
    fase: "Final",
    local: "TBD",
    visitante: "TBD",
    fecha: "2026-07-19",
    hora: "18:00",
    estadio: "MetLife Stadium",
    ciudad: "East Rutherford, NJ",
    precio: 1200,
    disponible: false,
  },
];

export const FASES = ["Todos", "Grupo", "Octavos", "Cuartos", "Semis", "Final"];

export default partidos;
