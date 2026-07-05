import { Link } from "react-router-dom";

// Portado de renderizarCompraExitosa() en cart.js.
export default function CompraExitosa({ numeroOrden }) {
  return (
    <div className="success-container">
      <div className="success-icon-wrapper">
        <i className="bx bx-check" />
      </div>
      <h1 className="success-title">¡COMPRA EXITOSA!</h1>
      <p className="success-subtitle">
        Tu pago fue procesado correctamente. Ya podés disfrutar del partido.
      </p>

      <div className="order-number-box">
        <div className="order-number-label">Número de orden</div>
        <div className="order-number-val">{numeroOrden}</div>
        <div className="order-number-note">Guardá este número para tus registros</div>
      </div>

      <Link to="/" className="btn-success-home">
        Volver al inicio
      </Link>
      <div className="success-email-note">
        Recibirás una confirmación en tu correo electrónico
      </div>
    </div>
  );
}