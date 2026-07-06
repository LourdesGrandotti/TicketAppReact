import { useState, useEffect } from 'react';
import partidos from '../data/partidos.js';

// Antes tenía su propia copia de la lista de partidos (con su propio manejo
// de override por localStorage). Ahora usa la fuente única de datos
// (src/data/partidos.js), que ya resuelve ese override internamente —
// evita mantener la misma lista de 16 partidos duplicada en 2 archivos.
export default function MatchBanner({ partidoId }) {
  const [match, setMatch] = useState(null);

  useEffect(() => {
    if (!partidoId) return;
    const matchFound = partidos.find((m) => Number(m.id) === Number(partidoId));
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
