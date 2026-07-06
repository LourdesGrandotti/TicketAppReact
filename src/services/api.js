// Base para hablar con el backend Express que ya tenían (backend/server.js,
// puerto 3000, montado en /api/usuarios). El backend NO cambia, solo el
// frontend que lo consume.
const BASE_URL = "http://localhost:3000/api";

export async function apiFetch(path, options = {}) {
  const res = await fetch(`${BASE_URL}${path}`, {
    headers: { "Content-Type": "application/json" },
    ...options,
  });
  if (!res.ok) {
    throw new Error(`Error ${res.status} en ${path}`);
  }
  return res.json();
}
