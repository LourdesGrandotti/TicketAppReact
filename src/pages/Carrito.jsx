// Migrado desde: frontend/carrito.html + js/modules/cart.js + js/modules/checkout.js
import useCheckout from "../hooks/useCheckout.js";
import StepperCheckout from "../components/checkout/StepperCheckout.jsx";
import CarritoVacio from "../components/checkout/CarritoVacio.jsx";
import ResumenCompra from "../components/checkout/ResumenCompra.jsx";
import FormularioPago from "../components/checkout/FormularioPago.jsx";
import CompraExitosa from "../components/checkout/CompraExitosa.jsx";

function Carrito() {
  const {
    paso,
    datosPartido,
    asientos,
    sectoresAgrupados,
    cargoServicio,
    total,
    ordenGenerada,
    irAPago,
    volverAResumen,
    volverAAsientos,
    confirmarCompra,
  } = useCheckout();

  // Estado vacío: igual que renderizarEstadoVacio() en cart.js, salvo que
  // ya se concretó la compra (ahí el carrito también queda vacío, pero
  // corresponde mostrar la pantalla de éxito, no la de "carrito vacío").
  if (asientos.length === 0 && paso !== "exito") {
    return (
      <main className="container-fluid my-2 flex-grow-1 px-4">
        <h1 className="checkout-main-title text-center mt-3 mb-0">Carrito de Compra</h1>
        <CarritoVacio />
      </main>
    );
  }

  return (
    <main className="container-fluid my-2 flex-grow-1 px-4">
      <h1 className="checkout-main-title text-center mt-3 mb-0">Carrito de Compra</h1>

      <StepperCheckout pasoActivo={paso} />

      {paso === "resumen" && (
        <ResumenCompra
          sectoresAgrupados={sectoresAgrupados}
          cargoServicio={cargoServicio}
          total={total}
          datosPartido={datosPartido}
          onIrAPagar={irAPago}
          onVolver={volverAAsientos}
        />
      )}

      {paso === "pago" && (
        <FormularioPago onConfirmarCompra={confirmarCompra} onVolver={volverAResumen} />
      )}

      {paso === "exito" && <CompraExitosa numeroOrden={ordenGenerada} />}
    </main>
  );
}

export default Carrito;
