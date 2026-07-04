// Migrar desde: frontend/home.html + frontend/js/main.js (130 líneas) + js/modules/script.js (151 líneas)
// Complejidad: BAJA — buen punto de partida para quien recién arranca con React.
// Contiene: hero banner, buscador de partidos, algunas cards destacadas.
function Home() {
  return (
    <div>
      <section className="hero-section d-flex justify-content-center align-items-center text-center px-3 py-5 w-100">
        <div className="d-flex flex-column align-items-center py-5 my-5 col-12 col-md-8">
          {/* TODO: portar el contenido real del hero desde home.html */}
          <h1>TicketApp</h1>
          <p>Entradas para el Mundial 2026</p>
        </div>
      </section>
      {/* TODO: portar buscador y cards destacadas (ver script.js) */}
    </div>
  );
}

export default Home;
