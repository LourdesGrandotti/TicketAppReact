/**
 * 📂 Archivo: src/components/admin/ModalGlobalAlert.jsx
 * 📝 Propósito: Componente modular del Modal Global de Alertas y Confirmaciones para la sección del administrador.
 * 💡 Descripción: Renderiza de forma declarativa un modal superpuesto (backdrop) con estilos de Bootstrap.
 *    Maneja internamente el valor de entrada (inputValue) y la validación de errores (inputError), liberando
 *    al componente de la página principal de estados efímeros e innecesarios.
 */

import React, { useState } from "react";

function ModalGlobalAlert({ config, onClose }) {
  // Manejo de estado local del input y mensajes de error
  const [inputValue, setInputValue] = useState("");
  const [inputError, setInputError] = useState("");

  if (!config) return null;

  const handleConfirmar = () => {
    if (config.requiereInput) {
      const valorTrim = inputValue.trim();
      if (config.validarInput) {
        const error = config.validarInput(valorTrim);
        if (error) {
          setInputError(error);
          return;
        }
      }
      config.accion(valorTrim);
    } else {
      config.accion();
    }
    onClose();
  };

  return (
    <div 
      className="modal fade show d-block" 
      style={{ backgroundColor: "rgba(0, 0, 0, 0.5)", zIndex: 1055 }} 
      role="dialog"
    >
      <div className="modal-dialog modal-dialog-centered modal-sm">
        <div className="modal-content rounded-3 shadow border-0 p-3 bg-white">
          <div className="text-center bg-transparent mb-2">
            <h5 className="fw-bold text-dark m-0">{config.titulo || "¿Confirmar acción?"}</h5>
            {config.mensaje && (
              <p className="text-secondary small m-0 mt-1">{config.mensaje}</p>
            )}
          </div>

          {config.requiereInput && (
            <div className="input-group my-2">
              <input 
                type="text" 
                className="form-control border-dark-subtle shadow-none shadow-sm text-center" 
                placeholder={config.inputPlaceholder || "Ingresar valor"}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
              />
            </div>
          )}

          {inputError && (
            <p className="text-danger small mt-1 mb-0 text-center fw-bold">{inputError}</p>
          )}

          <div className="d-flex flex-column gap-2 mt-3">
            <button 
              type="button" 
              className="ta-btn-comprar py-2 fs-6 w-100"
              onClick={handleConfirmar}
            >
              {config.textoBotonOk || "Confirmar"}
            </button>
            {!config.ocultarCancelar && (
              <button 
                type="button" 
                className="btn btn-light fw-bold rounded-pill py-2" 
                onClick={onClose}
              >
                Cancelar
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ModalGlobalAlert;
