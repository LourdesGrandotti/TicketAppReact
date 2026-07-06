/**
 * 📂 Archivo: src/components/admin/AdminDashboard.jsx
 * 📝 Propósito: Pestaña del Panel de Control (Dashboard) del Administrador.
 * 💡 Descripción: Muestra el resumen del día (KPIs de entradas, recaudación y cuenta regresiva
 *    del próximo partido activo) y el listado general de partidos con filtrado y paginación reactiva.
 */

import React, { useState } from "react";
import { obtenerEstadoReal, BadgeEstado } from "../../utils/adminHelpers.jsx";

const LIMITE_PARTIDOS_PAGINA = 7;

function AdminDashboard({ partidos, onEditar, onCancelar, onEliminar }) {
  // Estados lógicos de filtrado y paginación locales para el Dashboard
  const [filtroDashboard, setFiltroDashboard] = useState("todos");
  const [paginaActualDashboard, setPaginaActualDashboard] = useState(1);

  const ahora = new Date();

  // --- 1. CÁLCULO DEL KPI "PRÓXIMO PARTIDO" ---
  const proximosPartidos = partidos.filter((partido) => {
    const estadoReal = obtenerEstadoReal(partido);
    return estadoReal !== "cancelado" && estadoReal !== "finalizado";
  });

  proximosPartidos.sort((a, b) => new Date(a.fecha) - new Date(b.fecha));
  const proximoPartido = proximosPartidos[0];

  let kpiTextoTiempo = "SIN PARTIDOS PROGRAMADOS";
  let kpiHora = "--:-- hs";
  let kpiEquipos = <span className="text-muted small">No hay eventos activos</span>;

  if (proximoPartido) {
    const fechaPartido = new Date(proximoPartido.fecha);
    const diferenciaMs = fechaPartido - ahora;
    const diasRestantes = Math.floor(diferenciaMs / (1000 * 60 * 60 * 24));
    const horasRestantes = Math.floor((diferenciaMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));

    if (diasRestantes > 0) {
      kpiTextoTiempo = `PRÓXIMO PARTIDO EN ${diasRestantes} DÍA${diasRestantes === 1 ? '' : 's'}`;
    } else if (horasRestantes > 0) {
      kpiTextoTiempo = `PRÓXIMO PARTIDO EN ${horasRestantes} HORA${horasRestantes === 1 ? '' : 's'}`;
    } else {
      kpiTextoTiempo = `¡PRÓXIMO PARTIDO ES HOY!`;
    }

    const partesFecha = proximoPartido.fecha.split('T');
    kpiHora = `${partesFecha[1] || '00:00'} hs`;

    kpiEquipos = (
      <div className="d-flex align-items-center justify-content-center gap-2">
        <div className="d-flex align-items-center gap-1">
          <img src={`https://flagcdn.com/w20/${proximoPartido.codigoEquipo1}.png`} alt="Bandera 1" width="16" />
          <span className="fw-bold text-dark">{proximoPartido.nombreEquipo1}</span>
        </div>
        <span className="text-muted extra-small">vs</span>
        <div className="d-flex align-items-center gap-1">
          <img src={`https://flagcdn.com/w20/${proximoPartido.codigoEquipo2}.png`} alt="Bandera 2" width="16" />
          <span className="fw-bold text-dark">{proximoPartido.nombreEquipo2}</span>
        </div>
      </div>
    );
  }

  // --- 2. FILTRADO, ORDENAMIENTO Y PAGINACIÓN DE LA TABLA ---
  const partidosFiltrados = partidos.filter((partido) => {
    const estadoReal = obtenerEstadoReal(partido);
    if (filtroDashboard === "todos") return true;
    return estadoReal === filtroDashboard;
  });

  const partidosOrdenados = [...partidosFiltrados].sort((a, b) => {
    const estadoA = obtenerEstadoReal(a);
    const estadoB = obtenerEstadoReal(b);
    const esFinA = (estadoA === 'finalizado' || estadoA === 'cancelado');
    const esFinB = (estadoB === 'finalizado' || estadoB === 'cancelado');
    
    if (esFinA && !esFinB) return 1;
    if (!esFinA && esFinB) return -1;
    return new Date(a.fecha) - new Date(b.fecha);
  });

  const totalPartidos = partidosOrdenados.length;
  const totalPaginas = Math.ceil(totalPartidos / LIMITE_PARTIDOS_PAGINA) || 1;
  const paginaDashboardEfectiva = paginaActualDashboard > totalPaginas ? totalPaginas : paginaActualDashboard;
  
  const inicioDash = (paginaDashboardEfectiva - 1) * LIMITE_PARTIDOS_PAGINA;
  const finDash = inicioDash + LIMITE_PARTIDOS_PAGINA;
  const partidosAPaginarDashboard = partidosOrdenados.slice(inicioDash, finDash);

  return (
    <div>
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
        <div>
          <h1 className="h2 fw-bold m-0 font-montserrat">¡Bienvenido de vuelta! 👋</h1>
          <p className="text-muted small">Vista general de los datos para el día de hoy.</p>
        </div>
      </div>

      {/* Cajas de estadísticas (KPIs) */}
      <div className="row g-3 mb-4">
        {/* Entradas vendidas */}
        <div className="col-12 col-md-4">
          <div className="card p-3 border-0 shadow-sm rounded-3 h-100 position-relative bg-white">
            <div className="text-start">
              <span className="text-uppercase text-muted xsmall fw-bold">Entradas Vendidas Hoy</span>
              <h2 className="fw-bold my-1 text-dark">1,247</h2>
            </div>
            <span className="position-absolute end-0 bottom-0 m-3 badge bg-danger-subtle text-danger p-2 rounded-circle d-flex align-items-center justify-content-center badge-circle">
              <i className="bi bi-ticket-perforated fs-5"></i>
            </span>
          </div>
        </div>

        {/* Recaudación total */}
        <div className="col-12 col-md-4">
          <div className="card p-3 border-0 shadow-sm rounded-3 h-100 position-relative bg-white">
            <div className="text-start">
              <span className="text-uppercase text-muted xsmall fw-bold">Recaudación Total</span>
              <h2 className="fw-bold my-1 text-dark">$4.28M</h2>
            </div>
            <span className="position-absolute end-0 bottom-0 m-3 badge bg-danger-subtle text-danger p-2 rounded-circle d-flex align-items-center justify-content-center badge-circle">
              <i className="bi bi-tag fs-5"></i>
            </span>
          </div>
        </div>

        {/* Próximo partido */}
        <div className="col-12 col-md-4">
          <div className="card p-3 border-0 shadow-sm h-100 d-flex flex-column justify-content-center text-white" id="kpi-proximo-partido-contenedor">
            <div className="text-end mb-2">
              <span className="badge badge-kpi px-2 py-1 rounded small fw-bold">
                {kpiTextoTiempo}
              </span>
            </div>
            <div className="text-center mb-2 fw-bold fs-5 text-white">
              {kpiEquipos}
            </div>
            <div className="text-center small opacity-90 text-white fw-bold">
              {kpiHora}
            </div>
          </div>
        </div>
      </div>

      {/* Listado de partidos en Dashboard */}
      <div className="card shadow-sm mb-4">
        <div className="card-body">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h5 className="card-title text-success m-0 fw-bold">
              Listado General de Partidos
            </h5>
            <select 
              className="form-select form-select-sm w-auto" 
              value={filtroDashboard} 
              onChange={(e) => {
                setFiltroDashboard(e.target.value);
                setPaginaActualDashboard(1);
              }}
            >
              <option value="todos">Todos los partidos</option>
              <option value="proximo">Partidos próximos</option>
              <option value="reprogramado">Partidos reprogramados</option>
              <option value="cancelado">Partidos cancelados</option>
              <option value="finalizado">Partidos finalizados</option>
            </select>
          </div>

          <div className="table-responsive">
            <table className="table align-middle text-muted small">
              <thead className="table-light text-uppercase">
                <tr>
                  <th>Partido</th>
                  <th>Fecha y Hora</th>
                  <th>Asistencia</th>
                  <th>Estado</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {partidosAPaginarDashboard.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="text-center text-muted py-3">
                      No hay partidos registrados para mostrar.
                    </td>
                  </tr>
                ) : (
                  partidosAPaginarDashboard.map((partido) => {
                    const partesFecha = partido.fecha.split('T');
                    const fechaFormateada = partesFecha[0] || '---';
                    const horaFormateada = partesFecha[1] || '00:00';
                    const estadoReal = obtenerEstadoReal(partido);
                    const estaDeshabilitado = (estadoReal === 'finalizado' || estadoReal === 'cancelado');

                    return (
                      <tr key={partido.id}>
                        <td>
                          <div className="d-flex align-items-center gap-2">
                            <div className="d-flex align-items-center gap-1">
                              <img src={`https://flagcdn.com/w20/${partido.codigoEquipo1}.png`} alt="Bandera 1" width="20" />
                              <span className="fw-bold text-dark">{partido.nombreEquipo1}</span>
                            </div>
                            <span className="text-muted small">vs</span>
                            <div className="d-flex align-items-center gap-1">
                              <img src={`https://flagcdn.com/w20/${partido.codigoEquipo2}.png`} alt="Bandera 2" width="20" />
                              <span className="fw-bold text-dark">{partido.nombreEquipo2}</span>
                            </div>
                          </div>
                        </td>
                        <td>
                          <span className="fw-bold text-dark">{fechaFormateada}</span>
                          <div className="text-muted extra-small">{horaFormateada} hs</div>
                        </td>
                        <td>
                          <span className="fw-bold text-dark">0</span> / Asientos Totales
                        </td>
                        <td>
                          <BadgeEstado estado={estadoReal} />
                        </td>
                        <td className="text-nowrap">
                          <button 
                            className="btn btn-sm btn-light border btn-editar-dash me-1" 
                            disabled={estaDeshabilitado}
                            onClick={() => onEditar(partido.id)}
                            title={estaDeshabilitado ? "No se puede editar un partido finalizado o cancelado" : "Editar Partido"}
                          >
                            <i className="bi bi-pencil"></i>
                          </button>
                          {estaDeshabilitado ? (
                            <button 
                              className="btn btn-sm btn-outline-danger btn-eliminar-definitivo-dash" 
                              onClick={() => onEliminar(partido.id)}
                              title="Eliminar definitivamente del almacenamiento"
                            >
                              <i className="bi bi-trash"></i>
                            </button>
                          ) : (
                            <button 
                              className="btn btn-sm btn-light border btn-eliminar-dash" 
                              onClick={() => onCancelar(partido.id)}
                              title="Cancelar Partido"
                            >
                              <i className="bi bi-x-square"></i>
                            </button>
                          )}
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>

            {totalPaginas > 1 && (
              <nav className="d-flex justify-content-center mt-3" aria-label="Paginación Dashboard">
                <ul className="pagination pagination-sm m-0">
                  <li className={`page-item ${paginaDashboardEfectiva === 1 ? 'disabled' : ''}`}>
                    <button 
                      className="page-link d-flex align-items-center justify-content-center fw-semibold rounded-3 text-dark"
                      onClick={() => paginaDashboardEfectiva > 1 && setPaginaActualDashboard(paginaDashboardEfectiva - 1)}
                      type="button"
                      aria-label="Anterior"
                    >
                      &lsaquo;
                    </button>
                  </li>
                  {Array.from({ length: totalPaginas }, (_, i) => i + 1).map((num) => (
                    <li key={num} className={`page-item ${paginaDashboardEfectiva === num ? 'active' : ''}`}>
                      <button 
                        className="page-link d-flex align-items-center justify-content-center fw-semibold rounded-3 text-dark"
                        onClick={() => setPaginaActualDashboard(num)}
                        type="button"
                      >
                        {num}
                      </button>
                    </li>
                  ))}
                  <li className={`page-item ${paginaDashboardEfectiva === totalPaginas ? 'disabled' : ''}`}>
                    <button 
                      className="page-link d-flex align-items-center justify-content-center fw-semibold rounded-3 text-dark"
                      onClick={() => paginaDashboardEfectiva < totalPaginas && setPaginaActualDashboard(paginaDashboardEfectiva + 1)}
                      type="button"
                      aria-label="Siguiente"
                    >
                      &rsaquo;
                    </button>
                  </li>
                </ul>
              </nav>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
