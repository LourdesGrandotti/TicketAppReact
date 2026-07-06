import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import { useCart } from "../context/CartContext.jsx";

function Navbar() {
  const navigate = useNavigate();
  const { usuario, logout } = useAuth();
  const { items } = useCart();
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const handleLogoutClick = () => {
    setShowLogoutModal(true);
  };

  const confirmLogout = () => {
    setShowLogoutModal(false);
    logout();
    navigate("/");
  };

  const cancelLogout = () => {
    setShowLogoutModal(false);
  };

  return (
    <>
      <header className="d-flex flex-wrap justify-content-between align-items-center px-4 py-3 border-bottom shadow-sm position-relative" style={{ zIndex: 1040 }}>
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

          {usuario && (
            <>
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
            </>
          )}

          {usuario ? (
            <button
              onClick={handleLogoutClick}
              className="ta-btn-comprar text-nowrap"
            >
              Cerrar sesión
            </button>
          ) : (
            <Link
              to="/login"
              className="ta-btn-comprar text-nowrap"
            >
              Iniciar sesión
            </Link>
          )}
        </div>
      </header>

      {/* Modal de confirmación de Logout */}
      {showLogoutModal && (
        <div className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center" style={{ zIndex: 1050 }}>
          {/* Backdrop */}
          <div 
            className="position-absolute top-0 start-0 w-100 h-100 bg-dark" 
            style={{ opacity: 0.5 }}
            onClick={cancelLogout}
          ></div>
          
          {/* Modal Content */}
          <div className="bg-white rounded-4 p-4 shadow-lg position-relative d-flex flex-column align-items-center text-center" style={{ width: "90%", maxWidth: "450px" }}>
            <h5 className="fw-bold mb-4" style={{ color: "#333", fontSize: "1.25rem" }}>
              ¿Estás seguro de que quieres cerrar<br/>sesión?
            </h5>
            <div className="w-100 d-flex flex-column gap-3">
              <button 
                className="btn w-100 rounded-3 py-2 fw-bold text-white" 
                style={{ backgroundColor: "#ed194d", border: "none" }}
                onClick={confirmLogout}
              >
                Cerrar sesión
              </button>
              <button 
                className="btn w-100 rounded-3 py-2 fw-bold" 
                style={{ backgroundColor: "#fff", border: "1px solid #ddd", color: "#333" }}
                onClick={cancelLogout}
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Navbar;
