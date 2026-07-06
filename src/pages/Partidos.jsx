import { useSearchParams } from "react-router-dom";
import MatchCard from "../components/MatchCard.jsx";
import partidos, { FASES } from "../data/partidos.js";

/**
 * Partidos — página de listado de partidos del Mundial 2026.
 *
 * Migrado desde: frontend/partidos.html + js/modules/matches.js
 *
 * Lo que hacía matches.js y ahora hace React:
 *  - Leer la fase activa desde la querystring (?fase=Grupo) → useSearchParams()
 *  - Escribir la fase elegida en la querystring al cambiar filtro → setSearchParams()
 *  - Filtrar el array de partidos según la fase activa → .filter() en render
 *  - Renderizar cada tarjeta → <MatchCard /> (extraído como componente)
 *
 * El footer NO se repite acá; ya vive en App.jsx para todas las rutas.
 */
function Partidos() {
  // Lee/escribe ?fase= en la URL para que el filtro sea compartible por link
  const [searchParams, setSearchParams] = useSearchParams();
  const faseActiva = searchParams.get("fase") ?? "16avos";

  const partidosFiltrados = partidos.filter((p) => {
    return p.fase === faseActiva;
  });

  function cambiarFase(fase) {
    // Actualiza ?fase= en la URL
    setSearchParams({ fase });
  }

  return (
    <div>
      {/* Hero banner (equivalente a .ta-hero en partidos.html) */}
      <div className="ta-hero">
        <img
          src="/assets/img/estadio-hero.jpg"
          alt="Estadio Mundial 2026"
          className="ta-hero-img"
        />
        <div className="ta-hero-overlay" aria-hidden="true" />
        <div className="ta-hero-text">CALENDARIO</div>
      </div>

      <main className="ta-container">
        <h1 className="ta-section-title text-center" style={{ textAlign: 'center' }}>CALENDARIO DE PARTIDOS</h1>
        {/* Filtros de fase (equivalente a .ta-filter-pills) */}
        <nav className="ta-filter-pills" aria-label="Filtrar por fase">
          {FASES.map((fase) => (
            <button
              key={fase}
              id={`filtro-${fase.toLowerCase()}`}
              onClick={() => cambiarFase(fase)}
              className={`ta-phase-btn${faseActiva === fase ? " active" : ""}`}
              aria-pressed={faseActiva === fase}
            >
              {fase}
            </button>
          ))}
        </nav>

        {/* Lista de partidos */}
        {partidosFiltrados.length > 0 ? (
          <section aria-label="Lista de partidos">
            {partidosFiltrados.map((partido) => (
              <MatchCard key={partido.id} partido={partido} />
            ))}
          </section>
        ) : (
          <p className="text-center text-muted py-5">
            No hay partidos que coincidan con tu búsqueda.
          </p>
        )}
      </main>
    </div>
  );
}

export default Partidos;
