// Migrado desde: frontend/asientos.html + frontend/js/asientos.js + js/modules/seating.js
// Responsable: Grandotti Lourdes
// Complejidad: ALTA — mapa de butacas, selección, límite de asientos, sincronización multi-pestaña
// Estado del carrito gestionado por CartContext (src/context/CartContext.jsx)

import { useSearchParams, useNavigate } from 'react-router-dom';
import MatchBanner from '../components/MatchBanner';
import SeatsGrid from '../components/SeatsGrid';
import SummaryPanel from '../components/SummaryPanel';
import useSeating from '../hooks/useSeating';

function Asientos() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  // Parámetros recibidos desde Estadio: ?sector=A1&partido=3&cant=2
  const sector = searchParams.get('sector') || 'A1';
  const partido = searchParams.get('partido') || '';
  const cant = parseInt(searchParams.get('cant'), 10) || 1;
  const limit = Math.max(1, Math.min(cant, 4));

  const {
    seats,
    selectedSeats,
    alerta,
    toggleSeat,
    removeSeat,
    clearSelections,
  } = useSeating(sector, partido, limit);

  // Asientos seleccionados con todos sus datos para el panel lateral
  const selectedSeatsData = seats.filter((s) => selectedSeats.includes(s.idAsiento));

  const handleVolver = (e) => {
    e.preventDefault();
    clearSelections();
    navigate(partido ? `/estadio?partido=${partido}` : '/estadio');
  };

  const handleContinue = () => {
    navigate(partido ? `/carrito?partido=${partido}` : '/carrito');
  };

  return (
    <div className="d-flex flex-column flex-grow-1 bg-white">
      {/* Banner del partido */}
      {partido && <MatchBanner partidoId={partido} />}



      {/* Encabezado: botón volver + título del sector */}
      <div className="d-flex align-items-center gap-4 py-3 px-4 mb-2">
        <button 
          onClick={handleVolver}
          className="btn btn-brand rounded-pill px-4 fw-bold text-white d-flex align-items-center gap-2"
          style={{ backgroundColor: "#ed194d", border: "none" }}
        >
          <span className="fw-bold fs-5" style={{ marginTop: "-2px" }}>&lt;</span> Volver
        </button>
        <div className="d-flex flex-column align-items-start m-0">
          <span className="fw-bold text-uppercase fs-5" style={{ color: "#333", letterSpacing: "1px" }}>
            SECTOR {sector}
          </span>
          <p className="text-secondary fw-semibold mb-0" style={{ fontSize: "1.05rem" }}>
            Seleccioná hasta {limit} {limit === 1 ? 'asiento' : 'asientos'}
          </p>
        </div>
      </div>

      {/* Layout principal: grilla | panel de resumen */}
      <main className="ta-main flex-grow-1 px-4 py-2" aria-label="Selección de asientos">
        <div className="row g-4 w-100 m-0">

          {/* Columna izquierda: grilla de asientos */}
          <section className="col-12 col-lg-8 pe-lg-5" aria-label="Mapa de asientos del sector">

            {/* Alerta de límite */}
            {alerta && (
              <div
                className="alert alert-danger py-2 px-3 fw-semibold text-center mb-3"
                role="alert"
              >
                {alerta}
              </div>
            )}

            {/* Grilla de asientos */}
            <div className="border rounded-4 p-4 shadow-sm bg-light">
              <SeatsGrid seats={seats} onSeatClick={toggleSeat} />
            </div>

            {/* Leyenda de estados */}
            <div className="ta-legend mt-4" role="list" aria-label="Leyenda de estados de asientos">
              <div className="ta-legend-item" role="listitem">
                <span className="ta-leg-box unavailable-box" />
                No disponible
              </div>
              <div className="ta-legend-item" role="listitem">
                <span
                  className="ta-leg-box"
                  style={{ backgroundColor: '#d0e1fd', border: '1px solid #4a90e2' }}
                />
                Disponible
              </div>
              <div className="ta-legend-item" role="listitem">
                <span className="ta-leg-box selected-box" />
                Asiento seleccionado
              </div>
            </div>
          </section>

          {/* Columna derecha: panel de resumen y precio */}
          <section className="col-12 col-lg-4">
            <SummaryPanel
              selectedSeatsData={selectedSeatsData}
              onRemoveSeat={removeSeat}
              onContinue={handleContinue}
            />
          </section>

        </div>
      </main>
    </div>
  );
}

export default Asientos;
