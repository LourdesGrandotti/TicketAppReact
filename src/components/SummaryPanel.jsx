
export default function SummaryPanel({ selectedSeatsData, onRemoveSeat, onContinue }) {
  const total = selectedSeatsData.reduce((sum, seat) => sum + seat.precio, 0);

  return (
    <aside className="ta-panel-col" aria-label="Detalle de selección">
      {/* Encabezado de columnas */}
      <div className="ta-table-hdr" role="row">
        <div className="tr-asiento">Asiento</div>
        <div className="tr-fila">Fila</div>
        <div className="tr-qty">Cant.</div>
        <div className="tr-price">Precio</div>
        <div className="tr-cart" />
      </div>

      {/* Lista de asientos seleccionados */}
      <div id="tabla-detalle-body" role="list" aria-label="Asientos seleccionados">
        {selectedSeatsData.length === 0 ? (
          <div className="text-center text-muted py-3" style={{ fontSize: '11pt' }}>
            Ningún asiento seleccionado.
          </div>
        ) : (
          selectedSeatsData.map((seat) => (
            <div
              key={seat.idAsiento}
              className="ta-detalle-fila d-flex align-items-center py-2"
              role="listitem"
            >
              <div className="tr-asiento">{seat.numero}</div>
              <div className="tr-fila">{seat.fila}</div>
              <div className="tr-qty">1</div>
              <div className="tr-price">
                ${seat.precio.toLocaleString('es-AR')}
              </div>
              <div className="tr-cart">
                <button
                  type="button"
                  className="ta-cart-btn"
                  onClick={() => onRemoveSeat(seat.idAsiento)}
                  aria-label={`Quitar asiento ${seat.numero}`}
                >
                  <i className="bx bx-trash" style={{ color: '#ed194d', fontSize: '1.2rem' }} />
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Total calculado */}
      <div className="ta-total-line">
        Total: <span id="precio-total">${total.toLocaleString('es-AR')}</span>
      </div>

      {/* Botón continuar */}
      <div className="ta-continuar-wrap">
        <button
          className="ta-btn-continuar"
          id="btn-continuar"
          type="button"
          disabled={selectedSeatsData.length === 0}
          onClick={onContinue}
          aria-label="Continuar con la compra"
        >
          Continuar
        </button>
      </div>
    </aside>
  );
}

