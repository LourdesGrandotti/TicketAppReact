/**
 * 📂 Archivo: src/pages/Admin.jsx
 * 📝 Propósito: Página del panel de administración del portal de entradas de fútbol.
 * 💡 Descripción: Actúa como vista principal y contenedor estructural (Navbar superior y Sidebar de navegación).
 *    Consume la lógica de negocio y estados reactivos del Custom Hook "useAdmin" y renderiza las
 *    pestañas Dashboard, MatchManager y Auditoría de forma modular, protegiendo el acceso con "useAuth".
 */

import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import ModalGlobalAlert from "../components/admin/ModalGlobalAlert.jsx";
import AdminDashboard from "../components/admin/AdminDashboard.jsx";
import AdminMatchManager from "../components/admin/AdminMatchManager.jsx";
import AdminAudit from "../components/admin/AdminAudit.jsx";
import useAdmin from "../hooks/useAdmin.js";
import "../../public/css/admin.css"; // Estilos CSS del Administrador

function Admin() {
  // 1. Obtenemos el estado de autenticación global para proteger la ruta
  const { esAdmin, logout } = useAuth();

  // 2. Consumimos todos los estados y acciones lógicas desde nuestro Custom Hook
  const {
    tabActiva,
    setTabActiva,
    partidos,
    setPartidos,
    idPartidoEnEdicion,
    setIdPartidoEnEdicion,
    modalConfig,
    setModalConfig,
    dispararModalGlobal,
    cancelarPartidoDesdeID,
    eliminarPartidoDefinitivamente
  } = useAdmin();

  // 3. Verificación de seguridad: si no es admin, redirigir al login
  if (!esAdmin) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="bg-light min-vh-100">
      {/* Barra superior de administración (Navbar) */}
      <nav className="navbar navbar-expand navbar-white bg-white border-bottom sticky-top">
        <div className="container-fluid px-3">
          <span className="navbar-brand d-flex align-items-center gap-2">
            <img
              src="/assets/img/LogoTicketApp.png"
              alt="TicketApp Logo"
              className="navbar-logo"
              style={{ height: "40px" }}
            />
          </span>
          <div className="d-flex align-items-center ms-auto gap-3">
            <span className="badge bg-danger-subtle text-danger px-3 py-2 fs-6 fw-bold rounded-3">
              ADMIN
            </span>
            <button
              className="btn btn-brand rounded-pill px-4 py-2 fw-bold btn-sm"
              onClick={logout}
              type="button"
            >
              Cerrar Sesión
            </button>
          </div>
        </div>
      </nav>

      {/* Cuerpo principal con Sidebar lateral y Panel de Contenido */}
      <div className="container-fluid">
        <div className="row">
          {/* Sidebar de pestañas */}
          <nav className="col-md-3 col-lg-2 d-md-block bg-white sidebar border-end min-vh-100 p-0">
            <div className="position-sticky pt-3">
              <div className="nav nav-pills flex-column" id="adminTabs" role="tablist">
                <button
                  className={`nav-link text-start py-3 px-4 rounded-0 ${tabActiva === "panel-control" ? "active" : ""
                    }`}
                  onClick={() => setTabActiva("panel-control")}
                  type="button"
                >
                  <i className="bi bi-bar-chart-line me-2"></i> Panel de Control
                </button>

                <button
                  className={`nav-link text-start py-3 px-4 rounded-0 ${tabActiva === "gestionar-partidos" ? "active" : ""
                    }`}
                  onClick={() => setTabActiva("gestionar-partidos")}
                  type="button"
                >
                  <i className="bi bi-trophy me-2"></i> Gestionar Partidos
                </button>

                <button
                  className={`nav-link text-start py-3 px-4 rounded-0 ${tabActiva === "auditoria" ? "active" : ""
                    }`}
                  onClick={() => setTabActiva("auditoria")}
                  type="button"
                >
                  <i className="bi bi-cash-stack me-2"></i> Auditoría
                </button>
              </div>
            </div>
          </nav>

          {/* Contenedor del Contenido de Pestaña Activa */}
          <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4 pt-4">
            {tabActiva === "panel-control" && (
              <AdminDashboard
                partidos={partidos}
                onEditar={(id) => {
                  setTabActiva("gestionar-partidos");
                  setIdPartidoEnEdicion(id);
                }}
                onCancelar={cancelarPartidoDesdeID}
                onEliminar={eliminarPartidoDefinitivamente}
              />
            )}

            {tabActiva === "gestionar-partidos" && (
              <AdminMatchManager
                partidos={partidos}
                idPartidoEnEdicion={idPartidoEnEdicion}
                setIdPartidoEnEdicion={setIdPartidoEnEdicion}
                setPartidos={setPartidos}
                dispararModalGlobal={dispararModalGlobal}
                onCancelar={cancelarPartidoDesdeID}
                onEliminar={eliminarPartidoDefinitivamente}
              />
            )}

            {tabActiva === "auditoria" && (
              <AdminAudit partidos={partidos} />
            )}
          </main>
        </div>
      </div>

      {/* Modal Global de Confirmación y Alertas */}
      <ModalGlobalAlert config={modalConfig} onClose={() => setModalConfig(null)} />
    </div>
  );
}

export default Admin;
