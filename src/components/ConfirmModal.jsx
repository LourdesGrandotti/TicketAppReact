function ConfirmModal({ modal, setModal }) {
  if (!modal) return null;

  return (
    <div
      className="modal d-block"
      tabIndex={-1}
      style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
      onClick={modal.ocultarCancelar ? undefined : () => setModal(null)}
    >
      <div
        className="modal-dialog modal-dialog-centered modal-sm"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-content rounded-3 shadow border-0 p-3 bg-white">
          <div className="text-center bg-transparent mb-2">
            <h5 className="fw-bold text-dark m-0">{modal.titulo}</h5>
            {modal.mensaje && (
              <p className="text-secondary small m-0 mt-1">{modal.mensaje}</p>
            )}
          </div>

          <div className="d-flex flex-column gap-2 mt-3">
            <button
              type="button"
              className="btn btn-danger fw-bold rounded-pill py-2"
              onClick={() => {
                if (typeof modal.accion === "function") modal.accion();
                else setModal(null);
              }}
            >
              {modal.textoBotonOk || "Confirmar"}
            </button>
            {!modal.ocultarCancelar && (
              <button
                type="button"
                className="btn btn-light fw-bold rounded-pill py-2"
                onClick={() => setModal(null)}
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

export default ConfirmModal;
