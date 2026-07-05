// Migrar desde: frontend/partidos.html + frontend/js/modules/matches.js (465 líneas)
// Complejidad: MEDIA-ALTA. matches.js maneja filtros/búsqueda por
// querystring (URLSearchParams) y navegación a estadio.html con el partido
// elegido. Usar useSearchParams() de react-router-dom para leer/escribir
// esos parámetros. Extraer <MatchCard /> como componente reutilizable
// en src/components/.
function Partidos() {
  return (
    <div className="container-fluid px-4 py-5">
      <h1>Partidos</h1>
      {/* TODO: listar partidos (¿vienen de un JSON local o del backend?), filtros y <MatchCard /> */}
    </div>
  );
}

export default Partidos;
