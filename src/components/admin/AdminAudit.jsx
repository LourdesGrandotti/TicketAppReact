/**
 * 📂 Archivo: src/components/admin/AdminAudit.jsx
 * 📝 Propósito: Pestaña de Auditoría Financiera y Recaudación de Ventas para el Administrador.
 * 💡 Descripción: Muestra las métricas clave de recaudación, asientos ocupados y tickets vendidos.
 *    Integra la biblioteca externa Chart.js mediante referencias (useRef) para dibujar gráficos
 *    interactivos de barras y dona, garantizando su correcta destrucción al desmontar el componente.
 */

import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";
import { obtenerEstadoReal, obtenerSimulacionVentasSector } from "../../utils/adminHelpers.jsx";

function AdminAudit({ partidos }) {
  // Refs para los canvas de Chart.js
  const canvasBarrasRef = useRef(null);
  const canvasDonaRef = useRef(null);
  const chartBarrasRef = useRef(null);
  const chartDonaRef = useRef(null);

  // Cálculos dinámicos de Auditoría
  const partidosActivosAuditoria = partidos.filter(p => obtenerEstadoReal(p) !== 'cancelado');
  
  const totalRecaudado = partidosActivosAuditoria.reduce((sum, partido) => {
    return sum + partido.sectores.reduce((sumS, sector) => {
      return sumS + (sector.precio * obtenerSimulacionVentasSector(sector.nombre));
    }, 0);
  }, 0);

  const totalTickets = partidosActivosAuditoria.reduce((sum, partido) => {
    return sum + partido.sectores.reduce((sumS, sector) => {
      return sumS + obtenerSimulacionVentasSector(sector.nombre);
    }, 0);
  }, 0);

  const totalCapacidad = partidosActivosAuditoria.length * 1000;
  const promedioOcupacion = totalCapacidad > 0 ? Math.min(100, Math.round((totalTickets / totalCapacidad) * 100)) : 0;

  const formatMonto = (monto) => {
    if (monto >= 1000000) {
      return `$${(monto / 1000000).toFixed(2)}M`;
    }
    return `$${monto.toLocaleString()}`;
  };

  // Efecto para dibujar y actualizar gráficos de Auditoría (Chart.js)
  useEffect(() => {
    if (!canvasBarrasRef.current || !canvasDonaRef.current) {
      return;
    }

    // Destruimos instancias previas para evitar el error "Canvas already in use"
    if (chartBarrasRef.current) {
      chartBarrasRef.current.destroy();
    }
    if (chartDonaRef.current) {
      chartDonaRef.current.destroy();
    }

    const partidosActivos = partidos.filter(p => obtenerEstadoReal(p) !== "cancelado");

    // --- 1. CONFIGURACIÓN DEL GRÁFICO DE BARRAS ---
    const etiquetasBarras = partidosActivos.map(p => `${p.nombreEquipo1} vs ${p.nombreEquipo2}`);
    const datosRecaudacion = partidosActivos.map(p => {
      return p.sectores.reduce((acumulador, sector) => {
        const ventasSimuladas = obtenerSimulacionVentasSector(sector.nombre);
        return acumulador + (sector.precio * ventasSimuladas);
      }, 0);
    });

    const ctxBarras = canvasBarrasRef.current.getContext("2d");
    chartBarrasRef.current = new Chart(ctxBarras, {
      type: 'bar',
      data: {
        labels: etiquetasBarras,
        datasets: [{
          label: 'Recaudación ($)',
          data: datosRecaudacion,
          backgroundColor: '#ed194d',
          hoverBackgroundColor: '#d1103e',
          borderRadius: 6,
          borderSkipped: false
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false }
        },
        scales: {
          x: {
            grid: { display: false },
            ticks: { font: { family: 'Montserrat' } }
          },
          y: {
            beginAtZero: true,
            ticks: { font: { family: 'Montserrat' } }
          }
        }
      }
    });

    // --- 2. CONFIGURACIÓN DEL GRÁFICO DE DONA ---
    const resumenSectores = {};
    partidosActivos.forEach(partido => {
      partido.sectores.forEach(sector => {
        const nombre = sector.nombre;
        const ventas = obtenerSimulacionVentasSector(nombre);
        resumenSectores[nombre] = (resumenSectores[nombre] || 0) + ventas;
      });
    });

    const etiquetasDona = Object.keys(resumenSectores);
    const datosDona = Object.values(resumenSectores);
    const coloresDona = ['#ed194d', '#4d4d4d', '#999999', '#e6e6e6'];

    const ctxDona = canvasDonaRef.current.getContext("2d");
    chartDonaRef.current = new Chart(ctxDona, {
      type: 'doughnut',
      data: {
        labels: etiquetasDona,
        datasets: [{
          data: datosDona,
          backgroundColor: coloresDona,
          borderWidth: 2,
          borderColor: '#ffffff'
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false }
        },
        cutout: '70%'
      }
    });

    // Limpieza de gráficos al desmontar
    return () => {
      if (chartBarrasRef.current) {
        chartBarrasRef.current.destroy();
        chartBarrasRef.current = null;
      }
      if (chartDonaRef.current) {
        chartDonaRef.current.destroy();
        chartDonaRef.current = null;
      }
    };
  }, [partidos]);

  // Cálculos locales para la leyenda del gráfico de dona
  const resumenSectores = {};
  partidosActivosAuditoria.forEach(partido => {
    partido.sectores.forEach(sector => {
      const nombre = sector.nombre;
      const ventas = obtenerSimulacionVentasSector(nombre);
      resumenSectores[nombre] = (resumenSectores[nombre] || 0) + ventas;
    });
  });

  const etiquetasDona = Object.keys(resumenSectores);
  const datosDona = Object.values(resumenSectores);
  const totalVentasGlobal = datosDona.reduce((a, b) => a + b, 0);
  const coloresDona = ['#ed194d', '#4d4d4d', '#999999', '#e6e6e6'];

  return (
    <div>
      <div className="pt-3 pb-2 mb-3 border-bottom">
        <h2 className="fw-bold">Recaudación y Ventas</h2>
      </div>

      {/* Cajas de estadísticas de Auditoría */}
      <div className="row g-3 mb-4">
        {/* Monto Total Recaudado */}
        <div className="col-12 col-md-4">
          <div className="card p-3 shadow-sm border-0 bg-white">
            <div className="d-flex justify-content-between align-items-start">
              <div>
                <span className="text-uppercase text-muted xsmall fw-bold">Monto Total Recaudado</span>
                <h3 className="fw-bold my-1">{formatMonto(totalRecaudado)}</h3>
              </div>
              <span className="badge bg-success-subtle text-success p-2 fs-6 rounded">
                <i className="bi bi-cash"></i>
              </span>
            </div>
          </div>
        </div>

        {/* Tickets Vendidos */}
        <div className="col-12 col-md-4">
          <div className="card p-3 shadow-sm border-0 bg-white">
            <div className="d-flex justify-content-between align-items-start">
              <div>
                <span className="text-uppercase text-muted xsmall fw-bold">Tickets Vendidos</span>
                <h3 className="fw-bold my-1">{totalTickets.toLocaleString()}</h3>
              </div>
              <span className="badge bg-success-subtle text-success p-2 fs-6 rounded">
                <i className="bi bi-ticket-perforated"></i>
              </span>
            </div>
          </div>
        </div>

        {/* Porcentaje de Asientos Ocupados */}
        <div className="col-12 col-md-4">
          <div className="card p-3 shadow-sm border-0 bg-white">
            <div className="d-flex justify-content-between align-items-start">
              <div>
                <span className="text-uppercase text-muted xsmall fw-bold">Asientos Ocupados</span>
                <h3 className="fw-bold my-1">{promedioOcupacion}%</h3>
              </div>
              <span className="badge bg-info-subtle text-info p-2 fs-6 rounded">
                <i className="bi bi-percent"></i>
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Gráficos de Auditoría con Chart.js */}
      <div className="row g-4 mb-4">
        {/* Gráfico de Barras */}
        <div className="col-12 col-lg-8">
          <div className="card p-3 shadow-sm h-100 border-0 bg-white">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h6 className="fw-bold m-0">Monto Recaudado por Partido</h6>
            </div>
            <div className="position-relative chart-container-barras">
              <canvas id="grafico-barras" ref={canvasBarrasRef}></canvas>
            </div>
          </div>
        </div>

        {/* Gráfico de Dona */}
        <div className="col-12 col-lg-4">
          <div className="card p-3 shadow-sm h-100 border-0 bg-white">
            <h6 className="fw-bold mb-3">Distribución por Sector</h6>
            <div className="position-relative mb-3 chart-container-dona">
              <canvas id="grafico-dona" ref={canvasDonaRef}></canvas>
            </div>
            <ul className="list-unstyled small m-0" id="grafico-leyenda-sectores">
              {etiquetasDona.length === 0 ? (
                <li className="text-muted text-center py-2">No hay datos de sectores</li>
              ) : (
                etiquetasDona.map((sectorNombre, indice) => {
                  const cantidad = datosDona[indice];
                  const porcentaje = totalVentasGlobal > 0 ? Math.round((cantidad / totalVentasGlobal) * 100) : 0;
                  const color = coloresDona[indice % coloresDona.length];

                  return (
                    <li key={sectorNombre} className="d-flex justify-content-between align-items-center py-1">
                      <div className="d-flex align-items-center gap-2">
                        <span className="legend-color-dot" style={{ backgroundColor: color }}></span>
                        <span className="fw-semibold text-dark small">{sectorNombre}</span>
                      </div>
                      <span className="text-muted fw-bold small">{porcentaje}%</span>
                    </li>
                  );
                })
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminAudit;
