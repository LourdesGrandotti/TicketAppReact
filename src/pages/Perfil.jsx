// Migrar desde: frontend/perfil.html + frontend/js/modules/profile.js (524 líneas)
// Complejidad: MEDIA-ALTA por la cantidad de líneas, pero mayormente es
// datos del usuario + historial de compras (probablemente listas/formularios
// repetidos, no lógica muy compleja). Buen candidato para dividir en
// sub-componentes: <DatosPersonales />, <HistorialCompras />.
import { useAuth } from "../context/AuthContext.jsx";

function Perfil() {
  const { usuario } = useAuth();

  return (
    <div className="container-fluid px-4 py-5">
      <h1>Mi cuenta</h1>
      {/* TODO: portar datos reales + historial (ver profile.js) */}
      <p>{usuario?.email ?? "No hay usuario logueado"}</p>
    </div>
  );
}

export default Perfil;
