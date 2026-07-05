// Migrar desde: frontend/home.html + frontend/js/main.js (130 líneas) + js/modules/script.js (151 líneas)
// Complejidad: BAJA — buen punto de partida para quien recién arranca con React.
// Contiene: hero banner, buscador de partidos, algunas cards destacadas.



// src/pages/Home.jsx
import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import MatchCard from "../components/MatchCard.jsx";
import { proximosPartidos } from "../data/matches.js";

function Home() {
  const { usuario } = useAuth();
  const carouselRef = useRef(null);
  const [mostrarBotonIzq, setMostrarBotonIzq] = useState(false);

  const destinoCompra = usuario ? "/partidos" : "/login";

  // Portado de script.js: avanzar el carrusel, salvo que ya esté al final
  // (ahí el link "Ver más" navega normal a /partidos)
  const handleScrollRight = (e) => {
    const carousel = carouselRef.current;
    if (!carousel) return;
    const maxScrollLeft = carousel.scrollWidth - carousel.clientWidth;
    if (carousel.scrollLeft < maxScrollLeft - 10) {
      e.preventDefault();
      const anchoCard = carousel.querySelector(".card")?.offsetWidth ?? 0;
      carousel.scrollBy({ left: anchoCard + 24, behavior: "smooth" });
    }
  };

  const handleScrollLeft = () => {
    const carousel = carouselRef.current;
    if (!carousel) return;
    const anchoCard = carousel.querySelector(".card")?.offsetWidth ?? 0;
    carousel.scrollBy({ left: -(anchoCard + 24), behavior: "smooth" });
  };

  const handleScroll = () => {
    setMostrarBotonIzq((carouselRef.current?.scrollLeft ?? 0) > 5);
  };

  return (
    <div>
      <section className="hero-section d-flex justify-content-center align-items-center text-center px-3 py-5 w-100">
        <div className="d-flex flex-column align-items-center py-5 my-5 col-12 col-md-8">
          <span className="badge bg-brand rounded-pill px-3 py-2 mb-4">WORLD CUP 2026</span>
          <h1 className="display-3 fw-bold text-uppercase mb-4">
            SIENTE LA PASIÓN DEL JUEGO MÁS GRANDE DEL MUNDO
          </h1>
          <p className="lead mb-5 col-10">
            Asegura tu lugar en la historia. Entradas oficiales disponibles para todos los estadios y fases del torneo.
          </p>
          <Link to={destinoCompra} className="btn btn-brand btn-lg px-4 py-2 fw-bold text-uppercase">
            Comprar entradas
          </Link>
        </div>
      </section>

      <section className="container-fluid px-4 mt-5 mb-5">
        <div className="d-flex justify-content-between align-items-end mb-4 flex-wrap gap-3">
          <div>
            <h2 className="text-uppercase fw-bold mb-1 text-brand">Próximos partidos</h2>
            <p className="mb-0 text-muted">No te pierdas los encuentros más emocionantes de la semana</p>
          </div>
        </div>

        <div id="carousel-wrapper" className="position-relative">
          <div
            className={`position-absolute top-0 start-0 h-100 d-flex align-items-center z-3 carousel-btn-overlay-left pe-none width120 ${mostrarBotonIzq ? "" : "hidden"
              }`}
          >
            <div className="position-absolute top-0 start-0 w-100 h-100 bg-gradient-left z-n1"></div>
            <button
              type="button"
              onClick={handleScrollLeft}
              className="btn btn-brand rounded-circle p-3 shadow-lg d-flex align-items-center justify-content-center ms-3 pe-auto wh"
            >
              <i className="bx bx-chevron-left fs-3"></i>
            </button>
          </div>

          <div
            id="matches-carousel"
            ref={carouselRef}
            onScroll={handleScroll}
            className="d-flex flex-nowrap gap-4 overflow-auto pb-4 px-1"
          >
            {proximosPartidos.map((partido) => (
              <MatchCard key={partido.id} partido={partido} logueado={!!usuario} />
            ))}

            <div className="position-sticky end-0 d-flex align-items-center z-3 carousel-btn-overlay ps-5">
              <div className="position-absolute top-0 start-0 w-100 h-100 bg-gradient-right z-n1"></div>
              <Link
                to="/partidos"
                onClick={handleScrollRight}
                className="btn btn-brand rounded-pill px-4 py-3 fw-bold shadow-lg d-flex align-items-center gap-2 me-3 text-nowrap"
              >
                Ver más
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;