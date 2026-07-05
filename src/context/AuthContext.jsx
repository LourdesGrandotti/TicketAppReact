

// Reemplaza la lógica de sesión que hoy vive repartida entre
// auth.js, login.js, index-auth.js y profile.js (window.location + localStorage).
// TODO equipo: revisar exactamente qué guardaba cada uno de esos archivos
// en localStorage (usuario actual, rol admin/cliente, token) y volcarlo acá.

import { createContext, useContext, useState, useEffect } from "react";
import { usuariosService } from "../services/usuariosService.js";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [usuario, setUsuario] = useState(() => {
    const guardado = localStorage.getItem("usuarioActual");
    return guardado ? JSON.parse(guardado) : null;
  });

  useEffect(() => {
    if (usuario) {
      localStorage.setItem("usuarioActual", JSON.stringify(usuario));
    } else {
      localStorage.removeItem("usuarioActual");
    }
  }, [usuario]);

  // Devuelve el usuario si las credenciales coinciden, null si no,
  // y lanza un error si no hay conexión con el backend.
  async function login(identificador, password) {
    let usuarios;
    try {
      const datos = await usuariosService.listar();
      usuarios = datos.usuarios || [];
    } catch (error) {
      throw new Error("SIN_CONEXION");
    }

    const idMin = identificador.trim().toLowerCase();
    const encontrado = usuarios.find(
      (u) =>
        (u.nombre_usuario?.toLowerCase() === idMin || u.mail_usuario?.toLowerCase() === idMin) &&
        u.contraseña_usuario === password
    );

    if (encontrado) setUsuario(encontrado);
    return encontrado || null;
  }

  const logout = () => setUsuario(null);
  const esAdmin = usuario?.rol === "admin"; // confirmado en login.js: 'admin' | 'user'

  return (
    <AuthContext.Provider value={{ usuario, login, logout, esAdmin }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth debe usarse dentro de <AuthProvider>");
  return context;
}