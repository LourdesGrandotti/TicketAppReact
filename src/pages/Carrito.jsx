// Migrar desde: frontend/carrito.html + js/modules/cart.js (482 líneas) + js/modules/checkout.js (119 líneas)
// Complejidad: ALTA — conviene 2 personas. checkout.js modela el flujo de
// compra como una máquina de estados (revisá los comentarios de sesiones
// anteriores sobre esto). En React, cada "estado" del checkout puede ser
// un valor en un useState (ej: "carrito" | "pago" | "confirmacion") que
// decide qué sub-componente mostrar.
import { useCart } from "../context/CartContext.jsx";

function Carrito() {
  const { items, total, quitarItem } = useCart();

  return (
    <div className="container py-5">
      <h1>Tu carrito</h1>
      {items.length === 0 ? (
        <p>No tenés entradas en el carrito.</p>
      ) : (
        <ul className="list-group mb-3">
          {items.map((item) => (
            <li key={item.id} className="list-group-item d-flex justify-content-between">
              {/* TODO: reemplazar por <CartItem /> real, portado de cart.js */}
              <span>{item.nombre ?? "Entrada"}</span>
              <button onClick={() => quitarItem(item.id)} className="btn btn-sm btn-outline-danger">
                Quitar
              </button>
            </li>
          ))}
        </ul>
      )}
      <p className="fw-bold">Total: ${total}</p>
      {/* TODO: portar flujo de checkout (checkout.js) como máquina de estados */}
    </div>
  );
}

export default Carrito;
