import { createContext, useContext, useState, useEffect } from "react";

// Reemplaza cart.js (482 líneas). Ese archivo mezclaba estado (qué hay en el
// carrito) con DOM (pintar el resumen). Acá separamos: este Context guarda
// SOLO el estado; los componentes (CartItem, CartSummary, etc.) se encargan
// de mostrarlo. TODO equipo: portar la lógica de precios/descuentos/bloqueos
// de asientos que tenía cart.js hacia las funciones de abajo.

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [items, setItems] = useState(() => {
    const guardado = localStorage.getItem("carrito");
    return guardado ? JSON.parse(guardado) : [];
  });

  useEffect(() => {
    localStorage.setItem("carrito", JSON.stringify(items));
    
    // Sincronizar reserva de asientos para compatibilidad y la burbuja de la navbar
    const seatsInCart = items
      .filter((item) => item.tipo === "asiento")
      .map((item) => item.id);
    sessionStorage.setItem("ticketapp_mis_asientos_seleccionados", JSON.stringify(seatsInCart));
  }, [items]);

  const agregarItem = (item) => setItems((prev) => [...prev, item]);
  const quitarItem = (itemId) =>
    setItems((prev) => prev.filter((i) => i.id !== itemId));
  const vaciarCarrito = () => setItems([]);
  const total = items.reduce((acc, i) => acc + (i.precio ?? 0), 0);

  return (
    <CartContext.Provider
      value={{ items, agregarItem, quitarItem, vaciarCarrito, total }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart debe usarse dentro de <CartProvider>");
  return context;
}
