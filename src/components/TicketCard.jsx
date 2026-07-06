function TicketCard({ partido, variante }) {
  const esPasado = variante === "pasado";
  const borderClass = esPasado ? "border border-2" : "border-danger border-2";
  const separador = esPasado ? "—" : "VS";
  const separadorClass = esPasado ? "text-muted small" : "text-muted small fw-bold";

  return (
    <div className={`card ${borderClass} rounded-4 p-3 shadow-sm h-100`}>
      <div className="card-body p-0 text-center d-flex flex-column">
        <span className="text-muted small fw-semibold mb-3">Copa Mundial FIFA 2026</span>

        {/* Banderas y encuentro */}
        <div className="d-flex justify-content-center align-items-center gap-3 mb-4">
          <div className="d-flex flex-column align-items-center">
            <span className={`fi fi-${partido.home.flag} border rounded shadow-sm fs`} />
            <span className="small fw-semibold mt-1" style={{ fontSize: "0.75rem" }}>
              {partido.home.name}
            </span>
          </div>
          <span className={separadorClass}>{separador}</span>
          <div className="d-flex flex-column align-items-center">
            <span className={`fi fi-${partido.away.flag} border rounded shadow-sm fs`} />
            <span className="small fw-semibold mt-1" style={{ fontSize: "0.75rem" }}>
              {partido.away.name}
            </span>
          </div>
        </div>

        {/* Información del partido */}
        <div className="text-start border-top pt-3 mt-auto mb-4">
          <p className="mb-1 fw-bold text-dark small">
            {partido.date} | {partido.time}
          </p>
          <p className="mb-0 text-muted small" style={{ fontSize: "0.8rem" }}>
            {partido.stadium}
            <br />
            {partido.city}
          </p>
          <p className="mb-0 text-muted mt-2 small" style={{ fontSize: "0.75rem" }}>
            <b>Asientos:</b> {partido.asientosTxt}
          </p>
        </div>
      </div>
    </div>
  );
}

export default TicketCard;
