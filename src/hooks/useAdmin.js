/**
 * 📂 Archivo: src/hooks/useAdmin.js
 * 📝 Propósito: Custom Hook encargado de la lógica y estado del panel de administración.
 * 💡 Descripción: Centraliza los estados de la pestaña activa, la lista reactiva de partidos
 *    (sincronizada con LocalStorage), la edición de encuentros y el modal global de alertas.
 *    Provee las funciones de negocio de cancelación y eliminación definitiva listas para ser consumidas.
 */

import { useState, useEffect } from "react";
import { PARTIDOS_MUESTRA } from "../utils/adminHelpers.jsx";

function useAdmin() {
  // Pestaña activa actual (panel-control, gestionar-partidos, auditoria).
  const [tabActiva, setTabActiva] = useState("panel-control");

  // Estado del listado de partidos con inicialización en LocalStorage
  const [partidos, setPartidos] = useState(() => {
    const versionInicializacion = '3';
    const versionGuardada = localStorage.getItem('partidos_inicializados_version');
    const guardados = localStorage.getItem('partidos');
    
    if (versionGuardada === versionInicializacion && guardados) {
      return JSON.parse(guardados);
    } else {
      localStorage.setItem('partidos_inicializados_version', versionInicializacion);
      localStorage.setItem('partidos', JSON.stringify(PARTIDOS_MUESTRA));
      return PARTIDOS_MUESTRA;
    }
  });

  // Efecto secundario para persistir los cambios de partidos en LocalStorage
  useEffect(() => {
    localStorage.setItem('partidos', JSON.stringify(partidos));
  }, [partidos]);

  // ID del partido seleccionado para ser editado
  const [idPartidoEnEdicion, setIdPartidoEnEdicion] = useState(null);

  // Estado de configuración del modal global de alertas/confirmación
  const [modalConfig, setModalConfig] = useState(null);

  // Función para abrir el modal global configurado
  const dispararModalGlobal = (config) => {
    setModalConfig(config);
  };

  // Acción de negocio: Cancelar un partido por su ID
  const cancelarPartidoDesdeID = (idPartido) => {
    dispararModalGlobal({
      titulo: "⚠️ ¿Cancelar partido?",
      mensaje: "¿Está seguro que desea cancelar este partido? Dejará de mostrarse como activo en las listas.",
      textoBotonOk: "Cancelar Partido",
      accion: () => {
        setPartidos((prev) =>
          prev.map((partido) =>
            partido.id === idPartido ? { ...partido, estado: "cancelado" } : partido
          )
        );

        if (idPartidoEnEdicion === idPartido) {
          setIdPartidoEnEdicion(null);
        }

        dispararModalGlobal({
          titulo: "❌ Partido Cancelado",
          mensaje: "El partido ha sido cancelado correctamente de las listas.",
          ocultarCancelar: true,
          textoBotonOk: "Aceptar",
          accion: () => {}
        });
      }
    });
  };

  // Acción de negocio: Eliminar definitivamente un partido por su ID
  const eliminarPartidoDefinitivamente = (idPartido) => {
    dispararModalGlobal({
      titulo: "🗑️ ¿Eliminar definitivamente?",
      mensaje: "¿Está seguro que desea ELIMINAR DEFINITIVAMENTE este partido? Se borrará de forma permanente de sus registros.",
      textoBotonOk: "Eliminar de Todos Modos",
      accion: () => {
        setPartidos((prev) => prev.filter((partido) => partido.id !== idPartido));

        if (idPartidoEnEdicion === idPartido) {
          setIdPartidoEnEdicion(null);
        }

        dispararModalGlobal({
          titulo: "🗑️ Partido Eliminado",
          mensaje: "El partido fue eliminado definitivamente del almacenamiento.",
          ocultarCancelar: true,
          textoBotonOk: "Aceptar",
          accion: () => {}
        });
      }
    });
  };

  return {
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
  };
}

export default useAdmin;
