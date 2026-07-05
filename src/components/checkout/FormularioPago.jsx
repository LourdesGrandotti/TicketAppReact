import { useState } from "react";

// Portado de renderizarFormularioPago() en cart.js.
function formatearNumeroTarjeta(valor) {
  const digitos = valor.replace(/\D/g, "");
  const matches = digitos.match(/\d{1,4}/g);
  return matches ? matches.join(" ") : "";
}

function formatearFechaVencimiento(valor) {
  const digitos = valor.replace(/\D/g, "");
  if (digitos.length >= 2) {
    return `${digitos.substring(0, 2)}/${digitos.substring(2, 4)}`;
  }
  return digitos;
}

export default function FormularioPago({ onConfirmarCompra, onVolver }) {
  const [nombre, setNombre] = useState("");
  const [dni, setDni] = useState("");
  const [tarjeta, setTarjeta] = useState("");
  const [exp, setExp] = useState("");
  const [cvv, setCvv] = useState("");
  const [procesando, setProcesando] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setProcesando(true);
    // Mismo delay simulado que tenía cart.js (setTimeout de 900ms).
    // nombre/dni solo alimentan la tarjeta gráfica en pantalla, igual que
    // en el original — no se envían a ningún lado ni se persisten.
    setTimeout(() => {
      onConfirmarCompra();
    }, 900);
  };

  const numeroConPad = tarjeta
    ? tarjeta + "•••• •••• •••• ••••".substring(tarjeta.length)
    : "•••• •••• •••• ••••";

  return (
    <>
      <div className="btn-volver-container d-flex align-items-center gap-3">
        <button type="button" className="btn-volver" onClick={onVolver} aria-label="Volver">
          <i className="bx bx-chevron-left text-white fs-4" />
        </button>
        <h2 className="page-title">DATOS DE PAGO</h2>
      </div>

      <div className="payment-layout">
        <div className="card-graphic-wrapper">
          <div className="credit-card-mock">
            <div className="card-mock-chip">
              <i className="bx bx-credit-card" />
            </div>
            <div className="card-mock-number">{numeroConPad}</div>
            <div className="card-mock-bottom">
              <div>
                <div className="card-mock-label">Titular</div>
                <div className="card-mock-value">{nombre.trim() || "Nombre Apellido"}</div>
              </div>
              <div>
                <div className="card-mock-label">Vence</div>
                <div className="card-mock-value">{exp.trim() || "MM/AA"}</div>
              </div>
            </div>
          </div>
        </div>

        <form className="payment-form-container" onSubmit={handleSubmit}>
          <div className="form-group-custom">
            <label htmlFor="pago-nombre">Nombre del titular</label>
            <input
              type="text"
              id="pago-nombre"
              className="input-custom"
              placeholder="Como figura en la tarjeta"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              required
            />
          </div>
          <div className="form-group-custom">
            <label htmlFor="pago-dni">DNI del titular</label>
            <input
              type="text"
              id="pago-dni"
              className="input-custom"
              placeholder="Ingresá el DNI sin puntos ni espacios"
              maxLength={9}
              pattern="^[0-9]{7,9}$"
              title="El DNI debe tener entre 7 y 9 números"
              value={dni}
              onChange={(e) => setDni(e.target.value.replace(/\D/g, ""))}
              required
            />
          </div>
          <div className="form-group-custom">
            <label htmlFor="pago-tarjeta">Número de tarjeta</label>
            <input
              type="text"
              id="pago-tarjeta"
              className="input-custom"
              placeholder="0000 0000 0000 0000"
              maxLength={19}
              value={tarjeta}
              onChange={(e) =>
                setTarjeta(formatearNumeroTarjeta(e.target.value.substring(0, 19)))
              }
              required
            />
          </div>
          <div className="row">
            <div className="col-6">
              <div className="form-group-custom">
                <label htmlFor="pago-exp">Vencimiento</label>
                <input
                  type="text"
                  id="pago-exp"
                  className="input-custom"
                  placeholder="MM/AA"
                  maxLength={5}
                  value={exp}
                  onChange={(e) => setExp(formatearFechaVencimiento(e.target.value))}
                  required
                />
              </div>
            </div>
            <div className="col-6">
              <div className="form-group-custom">
                <label htmlFor="pago-cvv">CVV</label>
                <input
                  type="password"
                  id="pago-cvv"
                  className="input-custom"
                  placeholder="•••"
                  maxLength={3}
                  value={cvv}
                  onChange={(e) => setCvv(e.target.value.replace(/\D/g, ""))}
                  required
                />
              </div>
            </div>
          </div>
          <div className="secure-ssl-text">
            <i className="bx bxs-lock" />
            <span>Tus datos están protegidos con cifrado SSL de 256 bits</span>
          </div>
          <button type="submit" className="btn-pago-wide" disabled={procesando}>
            {procesando ? (
              <>
                <span className="spinner-border spinner-border-sm me-2" role="status" />
                Procesando pago...
              </>
            ) : (
              "Confirmar pago"
            )}
          </button>
        </form>
      </div>
    </>
  );
}