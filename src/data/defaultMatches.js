// src/data/defaultMatches.js
// Dataset de partidos del mundial extraído de profile.js (líneas 372–414).
// Se usa en Perfil.jsx para cruzar con las compras del usuario y renderizar
// la sección "Mis Tickets" (último partido + próximos partidos).

export const DEFAULT_MATCHES = {
  '16avos': [
    { id: 1, home: { name: 'Alemania', flag: 'de' }, away: { name: 'Paraguay', flag: 'py' }, date: 'Lunes, 29 jun', time: '15:00 HS.', stadium: 'MetLife Stadium', city: 'East Rutherford, EE.UU.' },
    { id: 2, home: { name: 'Francia', flag: 'fr' }, away: { name: 'Suecia', flag: 'se' }, date: 'Lunes, 29 jun', time: '19:00 HS.', stadium: 'Rose Bowl', city: 'Pasadena, EE.UU.' },
    { id: 3, home: { name: 'Sudáfrica', flag: 'za' }, away: { name: 'Canadá', flag: 'ca' }, date: 'Martes, 30 jun', time: '13:00 HS.', stadium: 'AT&T Stadium', city: 'Arlington, EE.UU.' },
    { id: 4, home: { name: 'Países Bajos', flag: 'nl' }, away: { name: 'Marruecos', flag: 'ma' }, date: 'Martes, 30 jun', time: '19:00 HS.', stadium: "Levi's Stadium", city: 'Santa Clara, EE.UU.' },
    { id: 5, home: { name: 'Portugal', flag: 'pt' }, away: { name: 'Croacia', flag: 'hr' }, date: 'Miércoles, 1 jul', time: '13:00 HS.', stadium: 'Hard Rock Stadium', city: 'Miami Gardens, EE.UU.' },
    { id: 6, home: { name: 'España', flag: 'es' }, away: { name: 'Austria', flag: 'at' }, date: 'Miércoles, 1 jul', time: '19:00 HS.', stadium: 'Estadio Azteca', city: 'Ciudad de México, México' },
    { id: 7, home: { name: 'Estados Unidos', flag: 'us' }, away: { name: 'Bosnia y Herz.', flag: 'ba' }, date: 'Jueves, 2 jul', time: '13:00 HS.', stadium: 'SoFi Stadium', city: 'Inglewood, EE.UU.' },
    { id: 8, home: { name: 'Bélgica', flag: 'be' }, away: { name: 'Senegal', flag: 'sn' }, date: 'Jueves, 2 jul', time: '19:00 HS.', stadium: 'Estadio Akron', city: 'Guadalajara, México' },
    { id: 9, home: { name: 'Brasil', flag: 'br' }, away: { name: 'Japón', flag: 'jp' }, date: 'Viernes, 3 jul', time: '13:00 HS.', stadium: 'AT&T Stadium', city: 'Arlington, EE.UU.' },
    { id: 10, home: { name: 'Costa de Marfil', flag: 'ci' }, away: { name: 'Noruega', flag: 'no' }, date: 'Viernes, 3 jul', time: '19:00 HS.', stadium: 'Lumen Field', city: 'Seattle, EE.UU.' },
    { id: 11, home: { name: 'México', flag: 'mx' }, away: { name: 'Ecuador', flag: 'ec' }, date: 'Sábado, 4 jul', time: '13:00 HS.', stadium: 'Estadio Azteca', city: 'Ciudad de México, México' },
    { id: 12, home: { name: 'Inglaterra', flag: 'gb-eng' }, away: { name: 'Rep. del Congo', flag: 'cg' }, date: 'Sábado, 4 jul', time: '19:00 HS.', stadium: 'MetLife Stadium', city: 'East Rutherford, EE.UU.' },
    { id: 13, home: { name: 'Argentina', flag: 'ar' }, away: { name: 'Cabo Verde', flag: 'cv' }, date: 'Domingo, 5 jul', time: '13:00 HS.', stadium: 'Hard Rock Stadium', city: 'Miami Gardens, EE.UU.' },
    { id: 14, home: { name: 'Australia', flag: 'au' }, away: { name: 'Egipto', flag: 'eg' }, date: 'Domingo, 5 jul', time: '19:00 HS.', stadium: 'Rose Bowl', city: 'Pasadena, EE.UU.' },
    { id: 15, home: { name: 'Suiza', flag: 'ch' }, away: { name: 'Argelia', flag: 'dz' }, date: 'Lunes, 6 jul', time: '13:00 HS.', stadium: 'Gillette Stadium', city: 'Foxborough, EE.UU.' },
    { id: 16, home: { name: 'Colombia', flag: 'co' }, away: { name: 'Ghana', flag: 'gh' }, date: 'Lunes, 6 jul', time: '19:00 HS.', stadium: 'SoFi Stadium', city: 'Inglewood, EE.UU.' },
  ],
  '8avos': [
    { id: 17, home: { name: 'Paraguay', flag: 'py' }, away: { name: 'Francia', flag: 'fr' }, date: 'Viernes, 10 jul', time: '15:00 HS.', stadium: 'MetLife Stadium', city: 'East Rutherford, EE.UU.' },
    { id: 18, home: { name: 'Gan. Sudáfrica/Canadá', flag: 'placeholder' }, away: { name: 'Marruecos', flag: 'ma' }, date: 'Viernes, 10 jul', time: '19:00 HS.', stadium: 'Rose Bowl', city: 'Pasadena, EE.UU.' },
    { id: 19, home: { name: 'Gan. Portugal/Croacia', flag: 'placeholder' }, away: { name: 'Gan. España/Austria', flag: 'placeholder' }, date: 'Sábado, 11 jul', time: '15:00 HS.', stadium: 'Hard Rock Stadium', city: 'Miami Gardens, EE.UU.' },
    { id: 20, home: { name: 'Gan. EE.UU./Bosnia', flag: 'placeholder' }, away: { name: 'Gan. Bélgica/Senegal', flag: 'placeholder' }, date: 'Sábado, 11 jul', time: '19:00 HS.', stadium: 'AT&T Stadium', city: 'Arlington, EE.UU.' },
    { id: 21, home: { name: 'Brasil', flag: 'br' }, away: { name: 'Costa de Marfil', flag: 'ci' }, date: 'Domingo, 12 jul', time: '15:00 HS.', stadium: 'Lumen Field', city: 'Seattle, EE.UU.' },
    { id: 22, home: { name: 'Gan. México/Ecuador', flag: 'placeholder' }, away: { name: 'Gan. Ing./Congo', flag: 'placeholder' }, date: 'Domingo, 12 jul', time: '19:00 HS.', stadium: 'Estadio Azteca', city: 'Ciudad de México, México' },
    { id: 23, home: { name: 'Gan. Argentina/Cabo Verde', flag: 'placeholder' }, away: { name: 'Gan. Australia/Egipto', flag: 'placeholder' }, date: 'Lunes, 13 jul', time: '15:00 HS.', stadium: 'Gillette Stadium', city: 'Foxborough, EE.UU.' },
    { id: 24, home: { name: 'Gan. Suiza/Argelia', flag: 'placeholder' }, away: { name: 'Gan. Colombia/Ghana', flag: 'placeholder' }, date: 'Lunes, 13 jul', time: '19:00 HS.', stadium: 'SoFi Stadium', city: 'Inglewood, EE.UU.' },
  ],
  '4tos': [
    { id: 25, home: { name: 'Gan. Partido 17', flag: 'placeholder' }, away: { name: 'Gan. Partido 18', flag: 'placeholder' }, date: 'Sábado, 18 jul', time: '19:00 HS.', stadium: 'MetLife Stadium', city: 'East Rutherford, EE.UU.' },
    { id: 26, home: { name: 'Gan. Partido 19', flag: 'placeholder' }, away: { name: 'Gan. Partido 20', flag: 'placeholder' }, date: 'Domingo, 19 jul', time: '15:00 HS.', stadium: 'Rose Bowl', city: 'Pasadena, EE.UU.' },
    { id: 27, home: { name: 'Gan. Partido 21', flag: 'placeholder' }, away: { name: 'Gan. Partido 22', flag: 'placeholder' }, date: 'Domingo, 19 jul', time: '19:00 HS.', stadium: 'AT&T Stadium', city: 'Arlington, EE.UU.' },
    { id: 28, home: { name: 'Gan. Partido 23', flag: 'placeholder' }, away: { name: 'Gan. Partido 24', flag: 'placeholder' }, date: 'Lunes, 20 jul', time: '19:00 HS.', stadium: 'Hard Rock Stadium', city: 'Miami Gardens, EE.UU.' },
  ],
  semifinal: [
    { id: 29, home: { name: 'Gan. Cuartos 1', flag: 'placeholder' }, away: { name: 'Gan. Cuartos 2', flag: 'placeholder' }, date: 'Martes, 23 jul', time: '19:00 HS.', stadium: 'MetLife Stadium', city: 'East Rutherford, EE.UU.' },
    { id: 30, home: { name: 'Gan. Cuartos 3', flag: 'placeholder' }, away: { name: 'Gan. Cuartos 4', flag: 'placeholder' }, date: 'Miércoles, 24 jul', time: '19:00 HS.', stadium: 'Rose Bowl', city: 'Pasadena, EE.UU.' },
  ],
  final: [
    { id: 31, home: { name: 'Gan. Semifinal 1', flag: 'placeholder' }, away: { name: 'Gan. Semifinal 2', flag: 'placeholder' }, date: 'Domingo, 27 jul', time: '18:00 HS.', stadium: 'MetLife Stadium', city: 'East Rutherford, EE.UU.' },
  ],
};
