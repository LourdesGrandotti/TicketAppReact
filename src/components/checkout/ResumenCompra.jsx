// Portado de renderizarResumen() en cart.js.
export default function ResumenCompra({
  sectoresAgrupados,
  cargoServicio,
  total,
  datosPartido,
  onIrAPagar,
  onVolver,
}) {
  return (
    <>
      <div className="btn-volver-container d-flex align-items-center gap-3">
        <button type="button" className="btn-volver" onClick={onVolver} aria-label="Volver">
          <i className="bx bx-chevron-left text-white fs-4" />
        </button>
        <h2 className="page-title">RESUMEN DE COMPRA</h2>
      </div>

      <div className="match-summary-card">
        <div className="match-summary-header">
          <span className="match-teams">{datosPartido?.equipos || "Partido"}</span>
          <span className="match-date-location">
            {datosPartido?.fechaHora || ""}
            {datosPartido?.estadio ? ` · ${datosPartido.estadio}` : ""}
          </span>
        </div>

        <div className="match-summary-body">
          {Object.entries(sectoresAgrupados).map(([sectorName, grupo]) => (
            <div className="summary-sector-group" key={sectorName}>
              <div className="summary-sector-header">
                <span>Sector {sectorName}</span>
                <span className="count-badge">
                  {grupo.asientos.length === 1
                    ? "1 entrada"
                    : `${grupo.asientos.length} entradas`}
                </span>
              </div>
              {grupo.asientos.map((asiento) => (
                <div className="summary-seat-row" key={asiento.id}>
                  <span className="summary-seat-desc">
                    Fila {asiento.fila} · Asiento {asiento.numero}
                  </span>
                  <span className="summary-seat-price">
                    ${asiento.precio.toLocaleString("es-AR")}
                  </span>
                </div>
              ))}
              <div className="summary-sector-subtotal">
                <span>Subtotal Sector {sectorName}</span>
                <span>${grupo.subtotal.toLocaleString("es-AR")}</span>
              </div>
            </div>
          ))}

          <div className="summary-charge-row">
            <span className="summary-charge-label">Cargo por servicio</span>
            <span className="summary-charge-val">
              ${cargoServicio.toLocaleString("es-AR")}
            </span>
          </div>
          <div className="summary-total-row">
            <span className="summary-total-label">TOTAL</span>
            <span className="summary-total-val">${total.toLocaleString("es-AR")}</span>
          </div>
        </div>
      </div>

      <div className="clearfix mt-4">
        <button className="btn-primary-action" onClick={onIrAPagar}>
          Ir al pago <i className="bx bx-right-arrow-alt" />
        </button>
      </div>
    </>
  );
}