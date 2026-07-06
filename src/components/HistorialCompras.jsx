import { DEFAULT_MATCHES } from "../data/defaultMatches.js";
import TicketCard from "./TicketCard.jsx";

function esPartidoPasado(dateStr) {
  if (!dateStr) return false;
  const str = dateStr.toLowerCase();
  let month = 6; // default julio (0-indexed)
  if (str.includes("jun")) month = 5;
  const dayMatch = str.match(/(\d+)/);
  const day = dayMatch ? parseInt(dayMatch[1], 10) : 1;
  const matchDate = new Date(2026, month, day);
  const today = new Date(2026, 6, 1); // 1 de julio de 2026
  return matchDate < today;
}

function HistorialCompras({ idUsuario }) {
  function obtenerMisTickets() {
    const compras = JSON.parse(localStorage.getItem("compras")) || [];
    const misCompras = compras.filter((c) => c.id_usuario === idUsuario);
    const todosLosPartidos = Object.values(
      JSON.parse(localStorage.getItem("MATCHES")) || DEFAULT_MATCHES
    ).flat();

    let ultimoPartido = null;
    const proximosPartidos = [];

    misCompras.forEach((compra) => {
      const partido = todosLosPartidos.find(
        (p) => Number(p.id) === Number(compra.id_partido)
      );
      if (!partido) return;

      const asientosTxt = compra.asientos ? compra.asientos.join(", ") : "S/D";
      const entrada = { ...partido, asientosTxt };

      if (esPartidoPasado(partido.date)) {
        if (!ultimoPartido) ultimoPartido = entrada;
      } else {
        proximosPartidos.push(entrada);
      }
    });

    return { ultimoPartido, proximosPartidos };
  }

  const { ultimoPartido, proximosPartidos } = obtenerMisTickets();

  return (
    <section className="mt-5 pt-4 border-top">
      <h2 className="text-danger fw-bold mb-4">Mis tickets</h2>

      <div className="row g-4">
        <div className="col-lg-3" id="contenedor-ultimo-partido">
          <h5 className="text-muted mb-3 small fw-bold">Último partido</h5>
          {ultimoPartido ? (
            <TicketCard partido={ultimoPartido} variante="pasado" />
          ) : (
            <p className="text-secondary small">No registrás partidos anteriores.</p>
          )}
        </div>

        <div className="col-lg-9">
          <h5 className="text-muted mb-3 small fw-bold">Próximos partidos</h5>
          <div className="row g-3" id="grid-proximos">
            {proximosPartidos.length > 0 ? (
              proximosPartidos.map((p) => (
                <div className="col-md-4" key={p.id}>
                  <TicketCard partido={p} variante="proximo" />
                </div>
              ))
            ) : (
              <p className="text-secondary small col-12">
                No tenés próximos partidos programados.
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default HistorialCompras;
