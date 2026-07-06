import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useCart } from "../context/CartContext.jsx";
import { useAuth } from "../context/AuthContext.jsx";
import { obtenerInfoPartido } from "../utils/matchInfo.js";

// Reemplaza checkout.js (la máquina de estados: resumen -> pago -> exito)
// más la parte de cálculo/agrupación que tenía cart.js. Los asientos en sí
// ya NO se leen de localStorage: vienen de CartContext, que Asientos.jsx
// ya llena con items { tipo: "asiento", precio, sector, fila, numero, ... }.

const CARGO_SERVICIO_PORCENTAJE = 0.1;
const CLAVE_SELECCION_GLOBAL = "ticketapp_asientos_seleccionados";

export default function useCheckout() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { items, quitarItem } = useCart();
  const { usuario } = useAuth();

  const [paso, setPaso] = useState("resumen"); // "resumen" | "pago" | "exito"
  const [ordenGenerada, setOrdenGenerada] = useState(null);

  const partidoId = searchParams.get("partido") || "";
  const datosPartido = obtenerInfoPartido(partidoId);

  // Solo tomamos del carrito los ítems que son asientos de ESTE partido
  // (por si en el futuro el carrito llega a tener otro tipo de ítem).
  const asientos = items.filter(
    (item) =>
      item.tipo === "asiento" &&
      (!partidoId || String(item.partidoId) === String(partidoId))
  );

  const subtotal = asientos.reduce((sum, a) => sum + a.precio, 0);
  const cargoServicio = Math.round(subtotal * CARGO_SERVICIO_PORCENTAJE);
  const total = subtotal + cargoServicio;

  // Agrupar por sector, igual que hacía cart.js con sectoresAgrupados
  const sectoresAgrupados = {};
  asientos.forEach((a) => {
    if (!sectoresAgrupados[a.sector]) {
      sectoresAgrupados[a.sector] = { asientos: [], subtotal: 0 };
    }
    sectoresAgrupados[a.sector].asientos.push(a);
    sectoresAgrupados[a.sector].subtotal += a.precio;
  });

  const irAPago = () => setPaso("pago");
  const volverAResumen = () => setPaso("resumen");

  // Idéntico al botón "volver" de renderizarResumen() en cart.js: vuelve a
  // asientos.html preservando la selección actual (sector/cant deducidos de
  // lo ya elegido), NO la borra — el usuario puede seguir ajustándola.
  const volverAAsientos = () => {
    let sector = "A1";
    let cant = 1;
    if (asientos.length > 0) {
      sector = asientos[0].sector;
      cant = asientos.length;
    }
    const params = new URLSearchParams();
    params.set("sector", sector);
    if (partidoId) params.set("partido", partidoId);
    params.set("cant", cant);
    navigate(`/asientos?${params.toString()}`);
  };

  const confirmarCompra = () => {
    const numeroOrden = `C-${Math.floor(Math.random() * 90000 + 10000)}`;

    // Guardar la compra con exactamente los mismos campos que checkout.js
    const compras = JSON.parse(localStorage.getItem("compras")) || [];
    compras.push({
      id_compra: numeroOrden,
      id_usuario: usuario ? (usuario._id || usuario.id_usuario) : "U002",
      id_partido: partidoId,
      asientos: asientos.map((a) => a.id),
      monto_total: total,
      fecha_compra: new Date().toISOString(),
    });
    localStorage.setItem("compras", JSON.stringify(compras));

    // Limpiar selección de asientos tras la compra exitosa — igual que
    // hacía checkout.js (removeItem completo, no un filtro parcial).
    localStorage.removeItem(CLAVE_SELECCION_GLOBAL);
    sessionStorage.removeItem("ticketapp_mis_asientos_seleccionados");

    // Sacar del carrito (CartContext) los asientos ya comprados
    asientos.forEach((a) => quitarItem(a.id));

    setOrdenGenerada(numeroOrden);
    setPaso("exito");
  };

  return {
    paso,
    datosPartido,
    asientos,
    sectoresAgrupados,
    subtotal,
    cargoServicio,
    total,
    ordenGenerada,
    irAPago,
    volverAResumen,
    volverAAsientos,
    confirmarCompra,
  };
}