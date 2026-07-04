// Migrar desde: frontend/admin.html + frontend/js/modules/admin/*.js (ui.js, storage.js, helpers.js, main.js)
// Complejidad: ALTA. Es un panel completo separado del resto de la app.
// Sugerencia: sub-dividir en components/admin/ (ej: AdminTable, AdminForm)
// en vez de un solo componente gigante. Solo debería ser accesible si
// useAuth().esAdmin es true — agregar esa protección de ruta.
function Admin() {
  return (
    <div className="container py-5">
      <h1>Panel de administración</h1>
      {/* TODO: portar tablas/formularios de admin.html y lógica de admin/*.js */}
    </div>
  );
}

export default Admin;
