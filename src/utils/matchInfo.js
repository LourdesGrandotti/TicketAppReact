// Migrado de frontend/js/modules/matchInfo.js — dependencia exclusiva del
// checkout, para mostrar equipos/fecha/estadio en el Resumen de compra.
const DEFAULT_MATCHES_16AVOS = [
  { id: 1, home: { name: "Alemania" }, away: { name: "Paraguay" }, date: "Lunes, 29 jun", time: "15:00 HS.", stadium: "MetLife Stadium", city: "East Rutherford, EE.UU." },
  { id: 2, home: { name: "Francia" }, away: { name: "Suecia" }, date: "Lunes, 29 jun", time: "19:00 HS.", stadium: "Rose Bowl", city: "Pasadena, EE.UU." },
  { id: 3, home: { name: "Sudáfrica" }, away: { name: "Canadá" }, date: "Martes, 30 jun", time: "13:00 HS.", stadium: "AT&T Stadium", city: "Arlington, EE.UU." },
  { id: 4, home: { name: "Países Bajos" }, away: { name: "Marruecos" }, date: "Martes, 30 jun", time: "19:00 HS.", stadium: "Levi's Stadium", city: "Santa Clara, EE.UU." },
  { id: 5, home: { name: "Portugal" }, away: { name: "Croacia" }, date: "Miércoles, 1 jul", time: "13:00 HS.", stadium: "Hard Rock Stadium", city: "Miami Gardens, EE.UU." },
  { id: 6, home: { name: "España" }, away: { name: "Austria" }, date: "Miércoles, 1 jul", time: "19:00 HS.", stadium: "Estadio Azteca", city: "Ciudad de México, México" },
  { id: 7, home: { name: "Estados Unidos" }, away: { name: "Bosnia y Herz." }, date: "Jueves, 2 jul", time: "13:00 HS.", stadium: "SoFi Stadium", city: "Inglewood, EE.UU." },
  { id: 8, home: { name: "Bélgica" }, away: { name: "Senegal" }, date: "Jueves, 2 jul", time: "19:00 HS.", stadium: "Estadio Akron", city: "Guadalajara, México" },
  { id: 9, home: { name: "Brasil" }, away: { name: "Japón" }, date: "Viernes, 3 jul", time: "13:00 HS.", stadium: "AT&T Stadium", city: "Arlington, EE.UU." },
  { id: 10, home: { name: "Costa de Marfil" }, away: { name: "Noruega" }, date: "Viernes, 3 jul", time: "19:00 HS.", stadium: "Lumen Field", city: "Seattle, EE.UU." },
  { id: 11, home: { name: "México" }, away: { name: "Ecuador" }, date: "Sábado, 4 jul", time: "13:00 HS.", stadium: "Estadio Azteca", city: "Ciudad de México, México" },
  { id: 12, home: { name: "Inglaterra" }, away: { name: "Rep. del Congo" }, date: "Sábado, 4 jul", time: "19:00 HS.", stadium: "MetLife Stadium", city: "East Rutherford, EE.UU." },
  { id: 13, home: { name: "Argentina" }, away: { name: "Cabo Verde" }, date: "Domingo, 5 jul", time: "13:00 HS.", stadium: "Hard Rock Stadium", city: "Miami Gardens, EE.UU." },
  { id: 14, home: { name: "Australia" }, away: { name: "Egipto" }, date: "Domingo, 5 jul", time: "19:00 HS.", stadium: "Rose Bowl", city: "Pasadena, EE.UU." },
  { id: 15, home: { name: "Suiza" }, away: { name: "Argelia" }, date: "Lunes, 6 jul", time: "13:00 HS.", stadium: "Gillette Stadium", city: "Foxborough, EE.UU." },
  { id: 16, home: { name: "Colombia" }, away: { name: "Ghana" }, date: "Lunes, 6 jul", time: "19:00 HS.", stadium: "SoFi Stadium", city: "Inglewood, EE.UU." },
];

export function obtenerInfoPartido(idPartido) {
  if (!idPartido) return null;
  const id = Number(idPartido);

  let lista = DEFAULT_MATCHES_16AVOS;
  try {
    const overridden = JSON.parse(localStorage.getItem("MATCHES"));
    if (overridden && Array.isArray(overridden["16avos"])) {
      lista = overridden["16avos"];
    }
  } catch {
    // Si la clave no existe o está corrupta, seguimos con el default.
  }

  const match = lista.find((m) => m.id === id);
  if (!match) return null;

  return {
    equipos: `${match.home.name} vs ${match.away.name}`,
    fechaHora: `${match.date} · ${match.time}`,
    estadio: match.stadium,
  };
}