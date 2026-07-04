import { createContext, useContext, useState, useEffect } from "react";

// Reemplaza la lógica de sesión que hoy vive repartida entre
// auth.js, login.js, index-auth.js y profile.js (window.location + localStorage).
// TODO equipo: revisar exactamente qué guardaba cada uno de esos archivos
// en localStorage (usuario actual, rol admin/cliente, token) y volcarlo acá.

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

  const login = (userData) => setUsuario(userData);
  const logout = () => setUsuario(null);
  const esAdmin = usuario?.rol === "admin"; // TODO: confirmar el nombre real del campo de rol (ver login.js línea ~116)

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
