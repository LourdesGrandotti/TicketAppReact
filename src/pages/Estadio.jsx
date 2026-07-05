// Migrar desde: frontend/estadio.html + js/modules/estadio-actions.js (27 líneas) + js/modules/matchInfo.js (59 líneas)
// Complejidad: MEDIA. Recibe el partido elegido vía querystring desde
// Partidos (ver estadio-actions.js) y navega a Asientos.
function Estadio() {
  return (
    <div className="container-fluid px-4 py-5">
      <h1>Estadio</h1>
      {/* TODO: mostrar info del partido/estadio, botón "Elegir asientos" */}
    </div>
  );
}

export default Estadio;
