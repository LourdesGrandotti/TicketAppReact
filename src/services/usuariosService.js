// Espejo de backend/routes/usuarios.js. Reemplaza los fetch/XHR que antes
// estaban repartidos dentro de login.js / profile.js / admin/*.js.
import { apiFetch } from "./api.js";

export const usuariosService = {
  listar: () => apiFetch("/usuarios"),
  crear: (usuario) =>
    apiFetch("/usuarios", { method: "POST", body: JSON.stringify(usuario) }),
  actualizar: (id, cambios) =>
    apiFetch(`/usuarios/${id}`, { method: "PUT", body: JSON.stringify(cambios) }),
  eliminar: (id) => apiFetch(`/usuarios/${id}`, { method: "DELETE" }),
};
