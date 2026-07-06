
export default function SummaryPanel({ selectedSeatsData, onRemoveSeat, onContinue }) {
  const total = selectedSeatsData.reduce((sum, seat) => sum + seat.precio, 0);

  return (
    <aside className="d-flex flex-column w-100" aria-label="Detalle de selección" style={{ borderLeft: "1px solid #eee", paddingLeft: "2rem" }}>
      {/* Encabezado de columnas */}
      <div className="row w-100 text-secondary fw-bold mb-3 border-bottom pb-3 m-0" role="row">
        <div className="col-3 px-1">Asiento</div>
        <div className="col-3 px-1 text-center">Fila</div>
        <div className="col-3 px-1 text-center">Cantidad</div>
        <div className="col-3 px-1 text-end">Precio</div>
      </div>

      {/* Lista de asientos seleccionados */}
      <div id="tabla-detalle-body" className="w-100" role="list" aria-label="Asientos seleccionados">
        {selectedSeatsData.length === 0 ? (
          <div className="text-secondary mt-3" style={{ fontSize: '1.05rem' }}>
            Ningún asiento seleccionado.
          </div>
        ) : (
          selectedSeatsData.map((seat) => (
            <div
              key={seat.idAsiento}
              className="row w-100 align-items-center p-3 mb-3 border rounded shadow-sm m-0"
              style={{ backgroundColor: "#fff" }}
              role="listitem"
            >
              <div className="col-3 px-1" style={{ color: "#555" }}>{seat.numero}</div>
              <div className="col-3 px-1 text-center" style={{ color: "#555" }}>{seat.fila}</div>
              <div className="col-3 px-1 text-center" style={{ color: "#555" }}>1</div>
              <div className="col-3 px-1 text-end fw-bold d-flex justify-content-end align-items-center gap-1" style={{ color: "#333" }}>
                ${seat.precio.toLocaleString('es-AR')}
                <button
                  type="button"
                  className="btn btn-link p-0 text-danger ms-1"
                  onClick={() => onRemoveSeat(seat.idAsiento)}
                  aria-label={`Quitar asiento ${seat.numero}`}
                >
                  <i className="bx bxs-cart fs-5" style={{ color: "#ed194d" }} />
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      <div className="pt-4 w-100 text-end">
        {/* Total calculado */}
        <div className="fw-bold fs-5 mb-4" style={{ color: "#333" }}>
          Total: <span id="precio-total">${total.toLocaleString('es-AR')}</span>
        </div>

        {/* Botón continuar */}
        <button
          className="btn rounded-pill w-100 py-3 fw-bold fs-5 text-white"
          id="btn-continuar"
          type="button"
          disabled={selectedSeatsData.length === 0}
          style={{ backgroundColor: selectedSeatsData.length === 0 ? "#ccc" : "#ed194d", border: "none" }}
          onClick={onContinue}
          aria-label="Continuar con la compra"
        >
          Continuar
        </button>
      </div>
    </aside>
  );
}

