import { Link } from "react-router-dom";

// Portado de renderizarEstadoVacio() en cart.js.
export default function CarritoVacio() {
  return (
    <div className="empty-cart-container">
      <div className="empty-cart-icon-wrapper d-flex align-items-center justify-content-center">
        <i className="bx bx-cart" />
      </div>
      <h2 className="empty-cart-title">Tu carrito está vacío</h2>
      <p className="empty-cart-subtitle">
        Todavía no seleccionaste ninguna entrada. Volvé al calendario y elegí tus asientos.
      </p>
      <div className="empty-cart-divider">
        <div className="empty-cart-divider-icon">
          <i className="bx bxs-map" />
        </div>
      </div>
      <div className="d-flex flex-column gap-3 align-items-center mb-4">
        <Link to="/partidos" className="btn-volver-mapa">
          <i className="bx bx-chevron-left" /> Volver al Calendario
        </Link>
      </div>
      <div className="limits-card">
        <i className="bx bxs-cart" />
        <div>
          Podés seleccionar hasta <b>4 entradas</b> por partido. Los asientos quedan
          reservados temporalmente mientras completás la compra.
        </div>
      </div>
    </div>
  );
}