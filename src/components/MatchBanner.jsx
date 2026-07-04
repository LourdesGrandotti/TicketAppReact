import { useState, useEffect } from 'react';


const DEFAULT_MATCHES = [
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

export default function MatchBanner({ partidoId }) {
  const [match, setMatch] = useState(null);

  useEffect(() => {
    if (!partidoId) return;

    let matchesList = DEFAULT_MATCHES;
    try {
      const storedMatches = JSON.parse(localStorage.getItem('MATCHES'));
      if (storedMatches && Array.isArray(storedMatches['16avos'])) {
        matchesList = storedMatches['16avos'];
      }
    } catch (e) {
      console.warn('No se pudo leer MATCHES del localStorage, usando datos locales.');
    }

    const matchFound = matchesList.find((m) => Number(m.id) === Number(partidoId));
    setMatch(matchFound || null);
  }, [partidoId]);

  if (!match) return <div className="ta-match-bar" />;

  const getFlagClass = (teamName) => {
    // Usamos el CDN de flag-icons ya cargado en index.html
    const map = {
      'alemania': 'de', 'paraguay': 'py', 'francia': 'fr', 'suecia': 'se',
      'sudáfrica': 'za', 'canadá': 'ca', 'países bajos': 'nl', 'marruecos': 'ma',
      'portugal': 'pt', 'croacia': 'hr', 'españa': 'es', 'austria': 'at',
      'estados unidos': 'us', 'bosnia y herz.': 'ba', 'bélgica': 'be', 'senegal': 'sn',
      'brasil': 'br', 'japón': 'jp', 'costa de marfil': 'ci', 'noruega': 'no',
      'méxico': 'mx', 'ecuador': 'ec', 'inglaterra': 'gb-eng', 'rep. del congo': 'cd',
      'argentina': 'ar', 'cabo verde': 'cv', 'australia': 'au', 'egipto': 'eg',
      'suiza': 'ch', 'argelia': 'dz', 'colombia': 'co', 'ghana': 'gh',
    };
    const key = teamName.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    // Also try with accents
    const keyWithAccent = teamName.toLowerCase();
    return map[keyWithAccent] || map[key] || 'un';
  };

  return (
    <div className="ta-match-bar" role="banner" aria-label="Información del partido">
      <div className="ta-bar-inner d-flex align-items-center gap-3">
        <div className="ta-bar-flags d-flex align-items-center gap-2">
          <span
            className={`fi fi-${getFlagClass(match.home.name)}`}
            style={{ fontSize: '1.8rem', borderRadius: 4 }}
            title={match.home.name}
          />
          <span className="ta-bar-vs text-white fw-bold">VS</span>
          <span
            className={`fi fi-${getFlagClass(match.away.name)}`}
            style={{ fontSize: '1.8rem', borderRadius: 4 }}
            title={match.away.name}
          />
        </div>
        <div className="ta-bar-sep" />
        <div className="ta-bar-info text-white">
          <div className="ta-bar-dt fw-bold">
            {match.home.name} vs {match.away.name}
          </div>
          <div className="ta-bar-dt">
            {match.date} · {match.time}
          </div>
          <div className="ta-bar-venue small">{match.stadium}</div>
          <div className="ta-bar-city small opacity-75">{match.city}</div>
        </div>
      </div>
    </div>
  );
}

