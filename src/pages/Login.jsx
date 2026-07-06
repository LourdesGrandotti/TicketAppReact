// Migrar desde: frontend/login.html + frontend/js/modules/login.js (313 líneas)
// Complejidad: MEDIA. Ojo con la lógica de roles (login.js línea ~116-118):
// redirige a admin.html o home.html según el rol del usuario. En React,
// esto se resuelve seteando el usuario en AuthContext (useAuth) y usando
// <Navigate> de react-router-dom en vez de window.location.href.
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import PasswordInput from "../components/PasswordInput.jsx";

function Login() {
  const [identificador, setIdentificador] = useState("");
  const [password, setPassword] = useState("");
  const [mensaje, setMensaje] = useState({ texto: "", tipo: "" });
  const { login } = useAuth();
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setMensaje({ texto: "Verificando credenciales...", tipo: "" });

    try {
      const usuarioLogueado = await login(identificador, password);

      if (!usuarioLogueado) {
        setMensaje({ texto: "Usuario o contraseña incorrectos.", tipo: "danger" });
        return;
      }

      setMensaje({ texto: "¡Inicio de sesión exitoso! Redirigiendo...", tipo: "success" });

      setTimeout(() => {
        navigate(usuarioLogueado.rol === "admin" ? "/admin" : "/");
      }, 1000);
    } catch {
      setMensaje({ texto: "No se pudo conectar con el servidor. ¿Está corriendo el backend?", tipo: "danger" });
    }
  }

  return (
    <main className="auth-bg d-flex flex-column min-vh-100 font-montserrat text-white justify-content-center align-items-center py-5">
      <div className="w-520">
        <div className="mb-4 text-start">
          <Link to="/">
            <img
              src="/assets/img/LogoTicketApp.png"
              alt="Logo TicketApp"
              className="img-fluid object-fit-contain"
              width="180"
            />
          </Link>
        </div>
        <h1 className="h2 fw-bold text-uppercase mb-4 text-start lh-sm spacing05">
          COMPRÁ TICKETS AL INSTANTE<br />EN UN SOLO LUGAR
        </h1>

        <div className="d-flex align-items-center text-white-70 mb-4 fs-6 opacity-75">
          <i className="bx bx-user me-2 fs-5"></i> Ingresá a tu cuenta
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-3 text-start">
            <label htmlFor="username" className="form-label small fw-medium text-white-70 mb-2">
              Usuario
            </label>
            <div className="auth-input-wrapper">
              <span className="auth-input-icon"><i className="bx bx-user"></i></span>
              <input
                type="text"
                className="form-control auth-input"
                id="username"
                placeholder="Ingresá tu usuario"
                value={identificador}
                onChange={(e) => setIdentificador(e.target.value)}
                required
              />
            </div>
          </div>

          <PasswordInput
            id="password"
            label="Contraseña"
            placeholder="Ingresá tu contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {mensaje.texto && (
            <p className={`fw-bold small text-center mb-3 text-${mensaje.tipo || "white"}`}>
              {mensaje.texto}
            </p>
          )}

          <button type="submit" className="ta-btn-comprar w-100 py-3 fw-bold text-uppercase mb-4 shadow-sm fs-6">
            Ingresá
          </button>

          <div className="text-center small text-white-50 opacity-75">
            ¿No tenés cuenta?
            <Link to="/registro" className="text-brand fw-bold text-decoration-none ms-1">
              ¡Registrate ahora!
            </Link>
          </div>
        </form>
      </div>
    </main>
  );
}

export default Login;