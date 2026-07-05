import { useNavigate } from "react-router-dom";

/**
 * MatchCard — tarjeta de partido reutilizable.
 *
 * Props:
 *  - partido : objeto con la forma del mock en src/data/partidos.js
 *
 * Responsabilidades:
 *  - Mostrar equipos, fecha/hora, estadio, ciudad y precio base.
 *  - Botón "Comprar" (disponible) navega a /estadio con los datos del
 *    partido en la querystring, tal como hacía estadio-actions.js.
 *  - Botón "Próximamente" (no disponible) es decorativo (disabled).
 *
 * NO incluye Footer ni Navbar — eso está en App.jsx.
 */
function MatchCard({ partido }) {
  const navigate = useNavigate();

  const { id, fase, local, visitante, fecha, hora, estadio, ciudad, precio, disponible } = partido;

  /** Formatea "2026-06-15" → "15 jun 2026" */
  const fechaFormateada = new Date(fecha + "T12:00:00").toLocaleDateString("es-AR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  function handleComprar() {
    // Pasar el id del partido en la querystring, igual que estadio-actions.js
    navigate(`/estadio?id=${encodeURIComponent(id)}`);
  }

  return (
    <article className="ta-match-card">
      <div className="ta-card-body">
        {/* Equipos */}
        <div className="ta-card-teams">
          <div className="ta-team-col">
            <span className="ta-tname">{local}</span>
          </div>
          <span className="ta-vs">vs</span>
          <div className="ta-team-col">
            <span className="ta-tname">{visitante}</span>
          </div>
        </div>

        <div className="ta-card-sep" aria-hidden="true" />

        {/* Info del partido */}
        <div className="ta-card-info">
          <p className="ta-dt">
            {fechaFormateada} · {hora}
          </p>
          <p className="ta-st">{estadio}</p>
          <p className="ta-ci">{ciudad}</p>
        </div>

        {/* Fase badge + precio */}
        <div className="d-flex flex-column align-items-end gap-2">
          <span className="badge bg-brand-light text-brand fw-semibold px-3 py-2 rounded-pill small">
            {fase}
          </span>
          {disponible && (
            <span className="ta-ci fw-semibold" style={{ color: "var(--dark)" }}>
              Desde USD {precio}
            </span>
          )}
        </div>

        {/* Acción */}
        {disponible ? (
          <button
            id={`btn-comprar-${id}`}
            onClick={handleComprar}
            className="btn btn-brand rounded-pill fw-bold text-nowrap px-4 py-2"
          >
            Comprar
          </button>
        ) : (
          <button
            id={`btn-proximo-${id}`}
            disabled
            className="ta-btn-proximo"
          >
            Próximamente
          </button>
        )}
      </div>

      {/* Barra inferior de venta */}
      {disponible && (
        <div className="ta-card-venta">
          Venta disponible · Precio desde USD {precio}
        </div>
      )}
    </article>
  );
}

export default MatchCard;
