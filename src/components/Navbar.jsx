import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import { useCart } from "../context/CartContext.jsx";

// Portado de <header> repetido en cada .html (ver home.html línea ~36).
// Antes, script.js/auth.js mostraban/ocultaban "Iniciar sesión" vs "Ver mi
// cuenta" tocando el DOM a mano según localStorage. Acá se resuelve solo,
// re-renderizando cuando cambia `usuario` en AuthContext.
function Navbar() {
  const { usuario, logout } = useAuth();
  const { items } = useCart();

  return (
    <header className="d-flex flex-wrap justify-content-between align-items-center px-4 py-3 border-bottom shadow-sm">
      <div className="d-flex align-items-center gap-3">
        <Link to="/">
          <img
            src="/assets/img/LogoTicketApp.png"
            alt="Logo TicketApp"
            className="img-fluid object-fit-contain"
            width="140"
            height="40"
          />
        </Link>
      </div>

      <div className="d-flex align-items-center justify-content-end gap-3">
        {usuario && (
          <Link
            to="/perfil"
            className="text-decoration-none text-dark small fw-medium text-nowrap"
          >
            Ver mi cuenta
          </Link>
        )}

        <Link
          to="/carrito"
          className="text-decoration-none position-relative me-2 rojo"
        >
          <i className="bx bx-cart fs-4"></i>
          {items.length > 0 && (
            <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill border border-dark bg-light text-dark p-1">
              {items.length}
            </span>
          )}
        </Link>

        <span className="text-secondary">|</span>

        {usuario ? (
          <button
            onClick={logout}
            className="btn btn-brand rounded-pill fw-bold text-nowrap px-4 py-2"
          >
            Cerrar sesión
          </button>
        ) : (
          <Link
            to="/login"
            className="btn btn-brand rounded-pill fw-bold text-nowrap px-4 py-2"
          >
            Iniciar sesión
          </Link>
        )}
      </div>
    </header>
  );
}

export default Navbar;
