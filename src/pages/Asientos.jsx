// Migrar desde: frontend/asientos.html + frontend/js/asientos.js (156 líneas) + js/modules/seating.js (501 líneas)
// Complejidad: ALTA — conviene 2 personas. Es el mapa de butacas: selección
// de sector/butaca, bloqueos temporales, cálculo de precio. Pensar bien qué
// va en estado local (useState del componente) vs qué necesita vivir en
// CartContext para sobrevivir la navegación a Carrito.
function Asientos() {
  return (
    <div className="container py-5">
      <h1>Elegí tus asientos</h1>
      {/* TODO: portar mapa de sectores/butacas y lógica de bloqueo (ver seating.js) */}
    </div>
  );
}

export default Asientos;
