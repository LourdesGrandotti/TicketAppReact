// Migrar desde: frontend/registro.html
// Complejidad: BAJA-MEDIA. Es un formulario, similar en estructura a Login.
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { usuariosService } from "../services/usuariosService.js";
import PasswordInput from "../components/PasswordInput.jsx";

const PAISES = [
  { value: "ar", label: "Argentina" },
  { value: "br", label: "Brasil" },
  { value: "uy", label: "Uruguay" },
  { value: "cl", label: "Chile" },
  { value: "co", label: "Colombia" },
  { value: "mx", label: "México" },
  { value: "es", label: "España" },
  { value: "us", label: "Estados Unidos" },
];

function Registro() {
  const [paso, setPaso] = useState(1);
  const [mensaje, setMensaje] = useState({ texto: "", tipo: "" });
  const navigate = useNavigate();

  const [datos, setDatos] = useState({
    email: "", username: "", password: "", confirmedPassword: "",
    documento: "", nacionalidad: "", tipoDocumento: "", terminos: false,
  });

  const actualizar = (campo) => (e) => {
    const valor = campo === "terminos" ? e.target.checked : e.target.value;
    setDatos((prev) => ({ ...prev, [campo]: valor }));
  };

  async function handleContinuar() {
    setMensaje({ texto: "", tipo: "" });

    if (!datos.email || !datos.username || !datos.password || !datos.confirmedPassword) {
      setMensaje({ texto: "Completá todos los campos.", tipo: "danger" });
      return;
    }
    if (datos.password !== datos.confirmedPassword) {
      setMensaje({ texto: "Las contraseñas no coinciden.", tipo: "danger" });
      return;
    }

    try {
      const respuesta = await usuariosService.listar();
      const usuarios = respuesta.usuarios || [];
      const email = datos.email.trim().toLowerCase();

      if (usuarios.some((u) => u.mail_usuario === email)) {
        setMensaje({ texto: "¡Ups! Este correo electrónico ya está registrado.", tipo: "danger" });
        return;
      }
      if (usuarios.some((u) => u.nombre_usuario === datos.username)) {
        setMensaje({ texto: "¡Ups! Este nombre de usuario ya está en uso.", tipo: "danger" });
        return;
      }
    } catch {
      setMensaje({ texto: "No se pudo conectar con el servidor. ¿Está corriendo el backend?", tipo: "danger" });
      return;
    }

    setPaso(2);
  }

  async function handleRegistrar(e) {
    e.preventDefault();

    if (!datos.documento || !datos.nacionalidad || !datos.tipoDocumento || !datos.terminos) {
      setMensaje({ texto: "Completá todos los campos y aceptá los términos.", tipo: "danger" });
      return;
    }

    const nuevoUsuario = {
      nombre_usuario: datos.username,
      mail_usuario: datos.email.trim().toLowerCase(),
      "contraseña_usuario": datos.password,
      rol: "user",
      documento: datos.documento.trim(),
      pais: PAISES.find((p) => p.value === datos.nacionalidad)?.label || "",
      tipo_documento: datos.tipoDocumento,
    };

    try {
      // Nota: con el api.js actual, si el backend responde con un error
      // de validación (ej. email duplicado), acá también cae porque
      // apiFetch tira excepción apenas res.ok es false, sin exponer el
      // mensaje real del backend. Ya validamos duplicados en el paso 1,
      // así que esto cubre sobre todo "backend caído". Si el equipo ajusta
      // apiFetch para adjuntar el mensaje del body al error, se puede
      // mostrar error.message acá en vez del texto genérico.
      await usuariosService.crear(nuevoUsuario);
    } catch {
      setMensaje({ texto: "No se pudo completar el registro. ¿Está corriendo el backend?", tipo: "danger" });
      return;
    }

    setMensaje({ texto: "¡Registro exitoso! Redirigiendo al login...", tipo: "success" });
    setTimeout(() => navigate("/login"), 1000);
  }

  return (
    <main className="auth-bg d-flex flex-column min-vh-100 font-montserrat text-white">
      <header className="d-flex justify-content-between align-items-center px-4 py-3">
        <div className="small text-white-50 opacity-75">
          ¿Ya tenés cuenta?
          <Link to="/login" className="text-brand fw-bold text-decoration-none ms-1">¡Ingresá ahora!</Link>
        </div>
      </header>

      <div className="container my-auto py-5">
        <div className="row g-5 align-items-center">
          <div className="col-12 col-md-4 col-lg-3 border-end border-white border-opacity-10 py-3">
            <div className="d-flex flex-column gap-4">
              <div className={`d-flex align-items-center gap-3 ${paso === 1 ? "text-white fw-bold" : "text-white-50 opacity-50"}`}>
                <span className={`fs-4 d-flex align-items-center justify-content-center rounded-circle wh40 ${paso === 1 ? "bg-brand text-white" : "bg-white bg-opacity-10"}`}>
                  <i className="bx bx-user"></i>
                </span>
                <div className="small text-uppercase">Creá tu cuenta</div>
              </div>
              <div className={`d-flex align-items-center gap-3 ${paso === 2 ? "text-white fw-bold" : "text-white-50 opacity-50"}`}>
                <span className={`fs-4 d-flex align-items-center justify-content-center rounded-circle wh40 ${paso === 2 ? "bg-brand text-white" : "bg-white bg-opacity-10"}`}>
                  <i className="bx bx-id-card"></i>
                </span>
                <div className="small text-uppercase">Validá tu identidad</div>
              </div>
            </div>
          </div>

          <div className="col-12 col-md-8 col-lg-9 text-start">
            <h2 className="h3 fw-bold text-uppercase mb-3 spacing05">
              {paso === 1 ? "CREÁ TU CUENTA TICKETAPP" : "REGISTRATE EN TICKETAPP"}
            </h2>
            <p className="text-white-70 opacity-75 small mb-4">
              {paso === 1
                ? "Por favor completa los datos de tu cuenta para comenzar el registro:"
                : "Para formar parte de Ticket APP necesitas validar tu identidad, por favor completá los siguientes datos:"}
            </p>

            {paso === 1 ? (
              <div className="w-100 w580">
                <div className="mb-3">
                  <label className="form-label small fw-medium text-white-70 mb-2">Correo electrónico</label>
                  <div className="auth-input-wrapper">
                    <span className="auth-input-icon"><i className="bx bx-envelope"></i></span>
                    <input type="email" className="form-control auth-input" placeholder="ejemplo@correo.com"
                      value={datos.email} onChange={actualizar("email")} required />
                  </div>
                </div>

                <div className="mb-3">
                  <label className="form-label small fw-medium text-white-70 mb-2">Nombre de usuario</label>
                  <div className="auth-input-wrapper">
                    <span className="auth-input-icon"><i className="bx bx-user"></i></span>
                    <input type="text" className="form-control auth-input" placeholder="Mi_usuario"
                      value={datos.username} onChange={actualizar("username")} required />
                  </div>
                </div>

                <PasswordInput id="password" label="Contraseña" placeholder="Contraseña"
                  value={datos.password} onChange={actualizar("password")} />

                <PasswordInput id="confirmedPassword" label="Confirmar contraseña" placeholder="Repite tu contraseña"
                  value={datos.confirmedPassword} onChange={actualizar("confirmedPassword")} />

                {mensaje.texto && (
                  <p className={`fw-bold small text-center mb-3 text-${mensaje.tipo}`}>{mensaje.texto}</p>
                )}

                <button type="button" onClick={handleContinuar}
                  className="btn btn-brand btn-lg w-100 py-3 fw-bold text-uppercase rounded-3 shadow-sm fs-6">
                  Continuar
                </button>
              </div>
            ) : (
              <form onSubmit={handleRegistrar} className="w-100 w580">
                <div className="mb-3">
                  <label className="form-label small fw-medium text-white-70 mb-2">Documento</label>
                  <input type="text" className="form-control auth-input-no-icon" placeholder="Documento"
                    value={datos.documento} onChange={actualizar("documento")} required />
                </div>

                <div className="mb-3">
                  <label className="form-label small fw-medium text-white-70 mb-2">Nacionalidad</label>
                  <select className="form-select auth-input-no-icon" value={datos.nacionalidad}
                    onChange={actualizar("nacionalidad")} required>
                    <option value="" disabled>Selecciona tu nacionalidad</option>
                    {PAISES.map((p) => <option key={p.value} value={p.value}>{p.label}</option>)}
                  </select>
                </div>

                <div className="mb-4">
                  <label className="form-label small fw-medium text-white-70 mb-2">Tipo de documento</label>
                  <select className="form-select auth-input-no-icon" value={datos.tipoDocumento}
                    onChange={actualizar("tipoDocumento")} required>
                    <option value="" disabled>Selecciona tipo de documento</option>
                    <option value="DNI">DNI (Documento Nacional de Identidad)</option>
                    <option value="Pasaporte">Pasaporte</option>
                    <option value="LC">Libreta Cívica</option>
                    <option value="LE">Libreta de Enrolamiento</option>
                  </select>
                </div>

                <div className="mb-4 small form-check">
                  <input type="checkbox" className="form-check-input bg-transparent border-secondary"
                    id="terminos" checked={datos.terminos} onChange={actualizar("terminos")} required />
                  <label className="form-check-label text-white-70 opacity-75" htmlFor="terminos">
                    He leído y acepto los <span className="text-white fw-bold">Términos y condiciones de usuario</span>
                  </label>
                </div>

                {mensaje.texto && (
                  <p className={`fw-bold small text-center mb-3 text-${mensaje.tipo}`}>{mensaje.texto}</p>
                )}

                <button type="submit" className="btn btn-brand btn-lg w-100 py-3 fw-bold text-uppercase rounded-3 shadow-sm fs-6">
                  Registrarse →
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}

export default Registro;
