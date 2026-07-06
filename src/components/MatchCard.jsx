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

  const { id, fase, local, visitante, fecha, hora, estadio, ciudad, precio, disponible, home, away } = partido;

  /** Formatea "2026-06-15" → "15 jun 2026" */
  const fechaFormateada = new Date(fecha + "T12:00:00").toLocaleDateString("es-AR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  function handleComprar() {
    // Pasar el id del partido en la querystring. Usamos "partido" (no "id")
    // para ser consistentes con el resto de la app (Home, Asientos, Carrito
    // ya usaban ese nombre, y coincide con el original: estadio-actions.js
    // leía location.search.get('partido')).
    navigate(`/estadio?partido=${encodeURIComponent(id)}`);
  }

  return (
    <article className="ta-match-card">
      <div className="ta-card-body">
        {/* Equipos */}
        <div className="d-flex align-items-center pe-4">
          <div className="d-flex flex-column align-items-center text-center" style={{ width: '100px' }}>
            {home?.flag ? (
              <img src={`https://flagcdn.com/w40/${home.flag}.png`} alt={local} className="ta-flag-img border mb-2" />
            ) : (
              <div className="ta-flag-placeholder text-dark bg-light border mb-2">{local.slice(0, 2).toUpperCase()}</div>
            )}
            <span className="ta-tname fw-bold text-uppercase" style={{ fontSize: '0.85rem' }}>{local}</span>
          </div>
          <span className="mx-3 fw-bold text-secondary">VS</span>
          <div className="d-flex flex-column align-items-center text-center" style={{ width: '100px' }}>
            {away?.flag ? (
              <img src={`https://flagcdn.com/w40/${away.flag}.png`} alt={visitante} className="ta-flag-img border mb-2" />
            ) : (
              <div className="ta-flag-placeholder text-dark bg-light border mb-2">{visitante.slice(0, 2).toUpperCase()}</div>
            )}
            <span className="ta-tname fw-bold text-uppercase" style={{ fontSize: '0.85rem' }}>{visitante}</span>
          </div>
        </div>

        <div className="border-start ps-4 d-flex flex-column justify-content-center flex-grow-1">
          <p className="fw-bold mb-1 text-dark" style={{ fontSize: '1.1rem' }}>
            {partido.date} | {partido.time}
          </p>
          <p className="mb-1 text-secondary" style={{ fontSize: '0.95rem' }}>{estadio}</p>
          <p className="mb-0 text-black-50 small">{ciudad}</p>
        </div>

        {/* Acción */}
        {disponible ? (
          <button
            id={`btn-comprar-${id}`}
            onClick={handleComprar}
            className="ta-btn-comprar text-nowrap ms-4"
          >
            Comprar entradas
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
        <div className="ta-card-venta bg-light border-top text-secondary small py-2 px-3">
          Venta disponible: 22/06
        </div>
      )}
    </article>
  );
}

export default MatchCard;
