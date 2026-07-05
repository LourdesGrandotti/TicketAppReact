/**
 * 📂 Archivo: src/components/admin/AdminMatchManager.jsx
 * 📝 Propósito: Pestaña de Gestión y Programación de Partidos para el Administrador.
 * 💡 Descripción: Contiene el formulario controlado de creación y edición de encuentros
 *    con sectores dinámicos y tarifas personalizables, más la tabla lateral de control de eventos activos.
 */

import React, { useState, useEffect } from "react";
import { obtenerEstadoReal } from "../../utils/adminHelpers.jsx";

const LIMITE_PARTIDOS_PAGINA = 7;

const PAISES_MUNDIAL = [
  { codigo: 'de', nombre: 'Alemania' }, { codigo: 'dz', nombre: 'Argelia' },
  { codigo: 'ar', nombre: 'Argentina' }, { codigo: 'au', nombre: 'Australia' },
  { codigo: 'at', nombre: 'Austria' }, { codigo: 'be', nombre: 'Bélgica' },
  { codigo: 'ba', nombre: 'Bosnia y Herzegovina' }, { codigo: 'br', nombre: 'Brasil' },
  { codigo: 'cm', nombre: 'Camerún' }, { codigo: 'cl', nombre: 'Chile' },
  { codigo: 'co', nombre: 'Colombia' }, { codigo: 'kr', nombre: 'Corea del Sur' },
  { codigo: 'ci', nombre: 'Costa de Marfil' }, { codigo: 'cr', nombre: 'Costa Rica' },
  { codigo: 'hr', nombre: 'Croacia' }, { codigo: 'ec', nombre: 'Ecuador' },
  { codigo: 'es', nombre: 'España' }, { codigo: 'us', nombre: 'Estados Unidos' },
  { codigo: 'fr', nombre: 'Francia' }, { codigo: 'gh', nombre: 'Ghana' },
  { codigo: 'gr', nombre: 'Grecia' }, { codigo: 'nl', nombre: 'Holanda' },
  { codigo: 'ir', nombre: 'Irán' }, { codigo: 'it', nombre: 'Italia' },
  { codigo: 'jp', nombre: 'Japón' }, { codigo: 'mx', nombre: 'México' },
  { codigo: 'ng', nombre: 'Nigeria' }, { codigo: 'pt', nombre: 'Portugal' },
  { codigo: 'ru', nombre: 'Rusia' }, { codigo: 'ch', nombre: 'Suiza' },
  { codigo: 'uy', nombre: 'Uruguay' }
];

function AdminMatchManager({ 
  partidos, 
  idPartidoEnEdicion, 
  setIdPartidoEnEdicion, 
  setPartidos, 
  dispararModalGlobal, 
  onCancelar, 
  onEliminar 
}) {
  // Estados de paginación locales para la tabla de gestión
  const [paginaActualPartidos, setPaginaActualPartidos] = useState(1);

  // Estados locales del Formulario de Creación/Edición
  const [equipo1, setEquipo1] = useState("");
  const [equipo2, setEquipo2] = useState("");
  const [fechaEncuentro, setFechaEncuentro] = useState("");
  const [sectoresForm, setSectoresForm] = useState([
    { nombre: 'Sector VIP', precio: '' },
    { nombre: 'Sector Platea', precio: '' },
    { nombre: 'Sector General', precio: '' },
    { nombre: 'Sector Popular', precio: '' }
  ]);

  // Efecto para autocompletar el formulario al entrar en modo Edición
  useEffect(() => {
    if (idPartidoEnEdicion !== null) {
      const partido = partidos.find((p) => p.id === idPartidoEnEdicion);
      if (partido) {
        setEquipo1(partido.codigoEquipo1);
        setEquipo2(partido.codigoEquipo2);
        setFechaEncuentro(partido.fecha);
        
        const sectoresMapeados = [
          { nombre: "Sector VIP", precio: partido.precios?.VIP || '' },
          { nombre: "Sector Platea", precio: partido.precios?.platea || '' },
          { nombre: "Sector General", precio: partido.precios?.general || '' },
          { nombre: "Sector Popular", precio: partido.precios?.popular || '' }
        ];
        setSectoresForm(sectoresMapeados);
      }
    } else {
      // Limpiar formulario y restablecer valores predeterminados
      setEquipo1("");
      setEquipo2("");
      setFechaEncuentro("");
      setSectoresForm([
        { nombre: 'Sector VIP', precio: '' },
        { nombre: 'Sector Platea', precio: '' },
        { nombre: 'Sector General', precio: '' },
        { nombre: 'Sector Popular', precio: '' }
      ]);
    }
  }, [idPartidoEnEdicion, partidos]);

  // Manejador del cambio de precio de un sector específico
  const handlePrecioSectorChange = (index, nuevoPrecio) => {
    setSectoresForm((prev) =>
      prev.map((sec, idx) => (idx === index ? { ...sec, precio: nuevoPrecio } : sec))
    );
  };

  // Agregar un sector personalizado
  const handleAgregarSectorClick = () => {
    dispararModalGlobal({
      titulo: "📝 Agregar Nuevo Sector",
      mensaje: "Ingrese el nombre del nuevo sector (ejemplo: Platea Alta):",
      requiereInput: true,
      inputPlaceholder: "Nombre del sector...",
      validarInput: (valor) => {
        if (!valor || valor.trim() === "") {
          return "El nombre del sector no puede estar vacío.";
        }
        const existe = sectoresForm.some(
          (sector) => sector.nombre.toLowerCase() === valor.trim().toLowerCase()
        );
        if (existe) {
          return "¡Error! Ya existe un sector con ese nombre.";
        }
        return null;
      },
      accion: (nombreNuevoSector) => {
        setSectoresForm((prev) => [...prev, { nombre: nombreNuevoSector.trim(), precio: "" }]);
      }
    });
  };

  // Eliminar un sector
  const handleEliminarSector = (index) => {
    setSectoresForm((prev) => prev.filter((_, idx) => idx !== index));
  };

  // Cancelar modo Edición
  const handleCancelarEdicion = () => {
    setIdPartidoEnEdicion(null);
  };

  // Guardar o Actualizar Partido
  const handleSubmitPartido = (e) => {
    e.preventDefault();

    if (!equipo1 || !equipo2 || !fechaEncuentro) {
      dispararModalGlobal({
        titulo: "⚠️ Error de validación",
        mensaje: "Por favor complete todos los datos requeridos.",
        ocultarCancelar: true,
        textoBotonOk: "Entendido",
        accion: () => {}
      });
      return;
    }

    if (equipo1 === equipo2) {
      dispararModalGlobal({
        titulo: "⚠️ Equipos duplicados",
        mensaje: "El equipo 1 y el equipo 2 no pueden ser el mismo país.",
        ocultarCancelar: true,
        textoBotonOk: "Corregir",
        accion: () => {}
      });
      return;
    }

    const pais1 = PAISES_MUNDIAL.find((p) => p.codigo === equipo1);
    const pais2 = PAISES_MUNDIAL.find((p) => p.codigo === equipo2);

    const preciosObjeto = {};
    sectoresForm.forEach((sec) => {
      let clave = sec.nombre.replace("Sector ", "");
      if (clave === "VIP") clave = "VIP";
      else clave = clave.toLowerCase();
      preciosObjeto[clave] = parseFloat(sec.precio) || 0;
    });

    if (idPartidoEnEdicion !== null) {
      setPartidos((prev) =>
        prev.map((partido) =>
          partido.id === idPartidoEnEdicion
            ? {
                ...partido,
                codigoEquipo1: equipo1,
                nombreEquipo1: pais1 ? pais1.nombre : equipo1.toUpperCase(),
                codigoEquipo2: equipo2,
                nombreEquipo2: pais2 ? pais2.nombre : equipo2.toUpperCase(),
                fecha: fechaEncuentro,
                precios: preciosObjeto,
                sectores: sectoresForm.map((sec) => ({
                  nombre: sec.nombre,
                  precio: parseFloat(sec.precio) || 0
                }))
              }
            : partido
        )
      );

      dispararModalGlobal({
        titulo: "✅ ¡Partido Actualizado!",
        mensaje: "Los cambios del partido se guardaron con éxito.",
        ocultarCancelar: true,
        textoBotonOk: "Aceptar",
        accion: () => {}
      });
    } else {
      const nuevoPartido = {
        id: Date.now(),
        codigoEquipo1: equipo1,
        nombreEquipo1: pais1 ? pais1.nombre : equipo1.toUpperCase(),
        codigoEquipo2: equipo2,
        nombreEquipo2: pais2 ? pais2.nombre : equipo2.toUpperCase(),
        fecha: fechaEncuentro,
        estado: "nuevo",
        precios: preciosObjeto,
        sectores: sectoresForm.map((sec) => ({
          nombre: sec.nombre,
          precio: parseFloat(sec.precio) || 0
        }))
      };

      setPartidos((prev) => [...prev, nuevoPartido]);

      dispararModalGlobal({
        titulo: "✅ ¡Partido Guardado!",
        mensaje: "El partido fue guardado y añadido a la tabla correctamente.",
        ocultarCancelar: true,
        textoBotonOk: "Aceptar",
        accion: () => {}
      });
    }

    setIdPartidoEnEdicion(null);
  };

  // --- ORDENAMIENTO Y PAGINACIÓN DE LA TABLA LATERAL ---
  const partidosActivosList = partidos.filter((p) => p.estado !== "cancelado");
  partidosActivosList.sort((a, b) => {
    const estadoA = obtenerEstadoReal(a);
    const estadoB = obtenerEstadoReal(b);
    if (estadoA === 'finalizado' && estadoB !== 'finalizado') return 1;
    if (estadoA !== 'finalizado' && estadoB === 'finalizado') return -1;
    return new Date(a.fecha) - new Date(b.fecha);
  });

  const totalPartidosList = partidosActivosList.length;
  const totalPaginasList = Math.ceil(totalPartidosList / LIMITE_PARTIDOS_PAGINA) || 1;
  const paginaListEfectiva = paginaActualPartidos > totalPaginasList ? totalPaginasList : paginaActualPartidos;
  const inicioList = (paginaListEfectiva - 1) * LIMITE_PARTIDOS_PAGINA;
  const finList = inicioList + LIMITE_PARTIDOS_PAGINA;
  const partidosAPaginarList = partidosActivosList.slice(inicioList, finList);

  return (
    <div>
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
        <div>
          <h1 className="h2 text-uppercase fw-bold m-0">Gestión de Partidos</h1>
          <p className="text-muted small">
            Administra, crea o modifica los eventos deportivos y sus tarifas.
          </p>
        </div>
      </div>

      <div className="row g-4">
        {/* Formulario de Carga/Edición */}
        <div className="col-12 col-md-5">
          <div className="card shadow-sm border border-2 border-primary-subtle bg-white">
            <div className="card-body">
              <h5 className="card-title text-brand mb-4 fw-bold" id="form-partido-titulo">
                {idPartidoEnEdicion !== null ? (
                  <>
                    <i className="bi bi-pencil-square me-2"></i>Editar Partido
                  </>
                ) : (
                  <>
                    <i className="bi bi-plus-circle-fill me-2"></i>Cargar Nuevo Partido
                  </>
                )}
              </h5>

              <form id="form-partido" onSubmit={handleSubmitPartido}>
                {/* Equipo 1 */}
                <div className="mb-3">
                  <label className="form-label small fw-bold text-brand">Equipo (1)</label>
                  <div className="d-flex gap-2 align-items-center">
                    <div id="flag-container-1" className="border rounded d-flex align-items-center justify-content-center bg-white flag-wrapper">
                      {equipo1 ? (
                        <img src={`https://flagcdn.com/w40/${equipo1}.png`} alt="Bandera 1" className="img-fluid" />
                      ) : (
                        <i className="bi bi-globe text-muted small"></i>
                      )}
                    </div>
                    <select 
                      className="form-select form-select-sm" 
                      id="select-equipo-1" 
                      value={equipo1}
                      onChange={(e) => setEquipo1(e.target.value)}
                      required
                    >
                      <option value="" disabled>Seleccionar país...</option>
                      {PAISES_MUNDIAL.map((pais) => (
                        <option key={pais.codigo} value={pais.codigo}>{pais.nombre}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Equipo 2 */}
                <div className="mb-3">
                  <label className="form-label small fw-bold text-brand">Equipo (2)</label>
                  <div className="d-flex gap-2 align-items-center">
                    <div id="flag-container-2" className="border rounded d-flex align-items-center justify-content-center bg-white flag-wrapper">
                      {equipo2 ? (
                        <img src={`https://flagcdn.com/w40/${equipo2}.png`} alt="Bandera 2" className="img-fluid" />
                      ) : (
                        <i className="bi bi-globe text-muted small"></i>
                      )}
                    </div>
                    <select 
                      className="form-select form-select-sm" 
                      id="select-equipo-2" 
                      value={equipo2}
                      onChange={(e) => setEquipo2(e.target.value)}
                      required
                    >
                      <option value="" disabled>Seleccionar país...</option>
                      {PAISES_MUNDIAL.map((pais) => (
                        <option key={pais.codigo} value={pais.codigo}>{pais.nombre}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Fecha */}
                <div className="mb-4">
                  <label className="form-label small fw-bold text-brand">Fecha y Hora del Encuentro</label>
                  <input 
                    type="datetime-local" 
                    className="form-control form-control-sm" 
                    id="input-fecha" 
                    value={fechaEncuentro}
                    onChange={(e) => setFechaEncuentro(e.target.value)}
                    required 
                  />
                </div>

                <hr className="text-muted my-3" />

                {/* Definición de Sectores */}
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <h6 className="small fw-bold text-brand m-0">
                    <i className="bi bi-tags-fill me-2"></i>Definir Precios por Sector ($)
                  </h6>
                  <button 
                    type="button" 
                    className="btn btn-outline-danger btn-sm extra-small fw-bold px-2 py-1"
                    onClick={handleAgregarSectorClick}
                  >
                    <i className="bi bi-plus-lg me-1"></i>Agregar Sector
                  </button>
                </div>

                {/* Contenedor dinámico de sectores */}
                <div className="row g-2 mb-4" id="contenedor-sectores">
                  {sectoresForm.map((sector, index) => (
                    <div key={index} className="col-6 mb-2">
                      <label className="form-label text-brand extra-small m-0">{sector.nombre}</label>
                      <div className="input-group input-group-sm">
                        <span className="input-group-text">$</span>
                        <input 
                          type="number" 
                          className="form-control input-precio-sector" 
                          value={sector.precio}
                          onChange={(e) => handlePrecioSectorChange(index, e.target.value)}
                          placeholder="0.00" 
                          min="0" 
                          required 
                        />
                        <button 
                          type="button" 
                          className="btn btn-outline-danger btn-eliminar-sector" 
                          onClick={() => handleEliminarSector(index)}
                          title="Eliminar este sector"
                        >
                          <i className="bi bi-trash"></i>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Botones de Envío y Cancelar */}
                <div className="d-grid gap-2">
                  <button type="submit" className="btn btn-brand btn-sm fw-bold py-2" id="btn-guardar-partido">
                    {idPartidoEnEdicion !== null ? "Actualizar Partido" : "Guardar Partido"}
                  </button>
                  {idPartidoEnEdicion !== null && (
                    <button 
                      type="button" 
                      className="btn btn-outline-secondary btn-sm fw-bold py-2"
                      onClick={handleCancelarEdicion}
                      id="btn-cancelar-edicion"
                    >
                      Cancelar Edición
                    </button>
                  )}
                </div>
              </form>
            </div>
          </div>
        </div>

        {/* Tabla lateral de partidos cargados */}
        <div className="col-12 col-md-7">
          <div className="card shadow-sm bg-white">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h5 className="card-title text-brand m-0 fw-bold">Partidos Cargados</h5>
                <span className="badge bg-secondary-subtle text-secondary small" id="contador-partidos">
                  Total: {totalPartidosList} partido{totalPartidosList === 1 ? '' : 's'}
                </span>
              </div>

              <div className="table-responsive">
                <table className="table align-middle text-muted small m-0">
                  <thead className="table-light text-uppercase">
                    <tr>
                      <th>Equipos</th>
                      <th>Fecha y Hora</th>
                      <th className="text-center">Ocupación / Ventas</th>
                      <th className="text-end">Acción</th>
                    </tr>
                  </thead>
                  <tbody>
                    {partidosAPaginarList.length === 0 ? (
                      <tr>
                        <td colSpan="4" className="text-center text-muted py-3">
                          No hay partidos activos programados.
                        </td>
                      </tr>
                    ) : (
                      partidosAPaginarList.map((partido) => {
                        const partesFecha = partido.fecha.split('T');
                        const fechaFormateada = partesFecha[0] || '---';
                        const horaFormateada = partesFecha[1] || '00:00';
                        const estadoReal = obtenerEstadoReal(partido);
                        const estaFinalizado = (estadoReal === 'finalizado');

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
                              <span className="text-dark fw-semibold">{fechaFormateada}</span>
                              <div className="text-muted extra-small">{horaFormateada} hs</div>
                            </td>
                            <td className="text-center">
                              <span className="fw-bold text-dark">0%</span>
                              <div className="text-muted extra-small">0 / Asientos Totales</div>
                            </td>
                            <td className="text-end text-nowrap">
                              <button 
                                className="btn btn-sm btn-outline-warning text-dark border me-1 bg-white"
                                disabled={estaFinalizado}
                                onClick={() => setIdPartidoEnEdicion(partido.id)}
                                title={estaFinalizado ? "No se puede editar un partido ya finalizado" : "Editar Partido"}
                              >
                                <i className="bi bi-pencil-square"></i>
                              </button>
                              {estaFinalizado ? (
                                <button 
                                  className="btn btn-sm btn-outline-danger bg-white"
                                  onClick={() => onEliminar(partido.id)}
                                  title="Eliminar definitivamente del almacenamiento"
                                >
                                  <i className="bi bi-trash"></i>
                                </button>
                              ) : (
                                <button 
                                  className="btn btn-sm btn-outline-danger bg-white"
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
              </div>

              {/* Paginación de Gestión de Partidos */}
              {totalPaginasList > 1 && (
                <nav className="d-flex justify-content-center mt-3" aria-label="Paginación Partidos">
                  <ul className="pagination pagination-sm m-0">
                    <li className={`page-item ${paginaListEfectiva === 1 ? 'disabled' : ''}`}>
                      <button 
                        className="page-link d-flex align-items-center justify-content-center fw-semibold rounded-3 text-dark"
                        onClick={() => paginaListEfectiva > 1 && setPaginaActualPartidos(paginaListEfectiva - 1)}
                        type="button"
                        aria-label="Anterior"
                      >
                        &lsaquo;
                      </button>
                    </li>
                    {Array.from({ length: totalPaginasList }, (_, i) => i + 1).map((num) => (
                      <li key={num} className={`page-item ${paginaListEfectiva === num ? 'active' : ''}`}>
                        <button 
                          className="page-link d-flex align-items-center justify-content-center fw-semibold rounded-3 text-dark"
                          onClick={() => setPaginaActualPartidos(num)}
                          type="button"
                        >
                          {num}
                        </button>
                      </li>
                    ))}
                    <li className={`page-item ${paginaListEfectiva === totalPaginasList ? 'disabled' : ''}`}>
                      <button 
                        className="page-link d-flex align-items-center justify-content-center fw-semibold rounded-3 text-dark"
                        onClick={() => paginaListEfectiva < totalPaginasList && setPaginaActualPartidos(paginaListEfectiva + 1)}
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
    </div>
  );
}

export default AdminMatchManager;
