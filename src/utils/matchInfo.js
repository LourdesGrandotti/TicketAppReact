import partidos from "../data/partidos.js";

// Antes tenía su propia copia de la lista de partidos (usada por Carrito
// para el Resumen de compra). Ahora reutiliza la fuente única de datos
// (src/data/partidos.js), la misma que usan Home/Partidos/Estadio.
export function obtenerInfoPartido(idPartido) {
  if (!idPartido) return null;

  const match = partidos.find((m) => String(m.id) === String(idPartido));
  if (!match) return null;

  return {
    equipos: `${match.home.name} vs ${match.away.name}`,
    fechaHora: `${match.date} · ${match.time}`,
    estadio: match.stadium,
  };
}
