// Migrar desde: frontend/login.html + frontend/js/modules/login.js (313 líneas)
// Complejidad: MEDIA. Ojo con la lógica de roles (login.js línea ~116-118):
// redirige a admin.html o home.html según el rol del usuario. En React,
// esto se resuelve seteando el usuario en AuthContext (useAuth) y usando
// <Navigate> de react-router-dom en vez de window.location.href.
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    // TODO: reemplazar por el fetch real al backend (ver backend/routes/usuarios.js)
    login({ email, rol: "cliente" });
    navigate("/");
  }

  return (
    <div className="container py-5">
      <h1>Iniciar sesión</h1>
      <form onSubmit={handleSubmit}>
        {/* TODO: portar estructura/estilos reales de login.html */}
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          className="form-control mb-2"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Contraseña"
          className="form-control mb-2"
        />
        <button type="submit" className="btn btn-brand">
          Ingresar
        </button>
      </form>
    </div>
  );
}

export default Login;
