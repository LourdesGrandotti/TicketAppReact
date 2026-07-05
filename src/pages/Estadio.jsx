import { useSearchParams, useNavigate } from "react-router-dom";
import partidos from "../data/partidos.js";

/**
 * Estadio — página de detalle de un partido + mapa del estadio.
 *
 * Migrado desde: frontend/estadio.html + js/modules/estadio-actions.js
 *                + js/modules/matchInfo.js
 *
 * Lo que hacían esos JS y ahora hace React:
 *  - matchInfo.js leía ?id= de URLSearchParams → useSearchParams()
 *  - Buscaba el partido en el array → find() sobre el mock de partidos
 *  - Rellenaba el DOM con fecha, equipos, estadio → JSX declarativo
 *  - estadio-actions.js conectaba el botón "Elegir asientos" → useNavigate()
 *
 * El partido se recibe por querystring (?id=ARG-MAR-01) tal como lo enviaba
 * MatchCard al hacer navigate(`/estadio?id=${partido.id}`).
 *
 * El footer NO se repite acá; ya vive en App.jsx para todas las rutas.
 */
function Estadio() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const id = searchParams.get("id");
  const partido = partidos.find((p) => p.id === id);

  /** Formatea "2026-06-15" → "15 de junio de 2026" */
  function formatearFecha(fechaISO) {
    return new Date(fechaISO + "T12:00:00").toLocaleDateString("es-AR", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  }

  function handleElegirAsientos() {
    // Pasa el id del partido a Asientos igual que lo haría el enlace original
    navigate(`/asientos?id=${encodeURIComponent(id)}`);
  }

  // Partido no encontrado (id inválido o acceso directo sin querystring)
  if (!partido) {
    return (
      <div className="ta-container text-center py-5">
        <h1 className="ta-section-title">Partido no encontrado</h1>
        <p className="mb-4 text-muted">
          El partido que buscás no existe o ya no está disponible.
        </p>
        <button
          id="btn-volver-partidos"
          onClick={() => navigate("/partidos")}
          className="btn btn-brand rounded-pill fw-bold px-4 py-2"
        >
          Ver todos los partidos
        </button>
      </div>
    );
  }

  const { local, visitante, fecha, hora, estadio, ciudad, fase } = partido;

  return (
    <div>
      {/* Barra de info del partido — equivalente a .ta-match-bar en estadio.html */}
      <div className="ta-match-bar">
        <div className="ta-bar-inner">
          {/* Banderas / equipos */}
          <div className="ta-bar-flags">
            <div className="ta-flag-placeholder" aria-label={local}>
              {local.slice(0, 2).toUpperCase()}
            </div>
            <span className="ta-bar-vs">vs</span>
            <div className="ta-flag-placeholder" aria-label={visitante}>
              {visitante.slice(0, 2).toUpperCase()}
            </div>
          </div>

          <div className="ta-bar-sep" aria-hidden="true" />

          {/* Datos del partido */}
          <div className="ta-bar-info">
            <p className="ta-bar-dt">
              {local} vs {visitante}
            </p>
            <p className="ta-bar-venue">{estadio} · {ciudad}</p>
            <p className="ta-bar-city">
              {formatearFecha(fecha)} · {hora} hs · {fase}
            </p>
          </div>
        </div>
      </div>

      {/* Imagen del estadio */}
      <div className="ta-hero" style={{ height: 320 }}>
        <img
          src="/assets/img/estadio.jpg"
          alt={`Estadio ${estadio}`}
          className="ta-hero-img"
        />
        <div className="ta-hero-overlay" aria-hidden="true" />
        <div className="ta-hero-text" style={{ fontSize: "48pt" }}>
          {estadio}
        </div>
      </div>

      <main className="ta-container">
        {/* Resumen del partido */}
        <section aria-label="Información del partido" className="mb-5">
          <h1 className="ta-section-title">
            {local} <span style={{ fontWeight: 400 }}>vs</span> {visitante}
          </h1>

          <div className="d-flex flex-wrap justify-content-center gap-4 mb-4">
            <div className="ta-card-info text-start">
              <p className="ta-dt">📅 {formatearFecha(fecha)} · {hora} hs</p>
              <p className="ta-st">🏟 {estadio}</p>
              <p className="ta-ci">📍 {ciudad}</p>
              <p className="ta-ci mt-1">
                <span className="badge bg-brand-light text-brand fw-semibold px-3 py-2 rounded-pill small">
                  {fase}
                </span>
              </p>
            </div>
          </div>
        </section>

        {/* CTA principal — botón rojo igual al de MatchCard */}
        <div className="text-center">
          <button
            id="btn-elegir-asientos"
            onClick={handleElegirAsientos}
            className="btn btn-brand rounded-pill fw-bold px-5 py-3 fs-5"
          >
            Elegir asientos
          </button>
        </div>
      </main>
    </div>
  );
}

export default Estadio;
