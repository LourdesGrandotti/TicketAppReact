import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import { usuariosService } from "../services/usuariosService.js";
import CampoLectura from "./CampoLectura.jsx";

const PAISES = [
  "Argentina", "Brasil", "Uruguay", "Chile",
  "Colombia", "México", "España", "Estados Unidos",
];

const FOTO_PLACEHOLDER =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120' fill='%23adb5bd' viewBox='0 0 16 16'%3E%3Cpath d='M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0'/%3E%3Cpath fill-rule='evenodd' d='M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1'/%3E%3C/svg%3E";

function DatosPersonales({ datosUsuario, setDatosUsuario, setMensaje, setModal }) {
  const { usuario, login: setUsuarioEnContexto, logout } = useAuth();
  const navigate = useNavigate();
  const inputFotoRef = useRef(null);

  const [modoEdicion, setModoEdicion] = useState(false);
  const [datosForm, setDatosForm] = useState({ nombre: "", pais: "" });
  const [fotoPerfil, setFotoPerfil] = useState(null);

  const nombreCompleto = datosUsuario.nombre_usuario || "Nombre Apellido";
  const email = datosUsuario.mail_usuario || "email@example.com";
  const pais = datosUsuario.pais || "—";
  const tipoDoc = datosUsuario.tipo_documento || "—";
  const numDoc = datosUsuario.documento || datosUsuario.nro_documento || "—";
  const idUsuario = datosUsuario._id || datosUsuario.id_usuario;

  useEffect(() => {
    const fotoGuardada = localStorage.getItem("profilePhoto_" + idUsuario);
    if (fotoGuardada) setFotoPerfil(fotoGuardada);
  }, [idUsuario]);

  function handleFotoChange(e) {
    const archivo = e.target.files[0];
    if (!archivo) return;

    if (!archivo.type.startsWith("image/")) {
      setMensaje({ texto: "Por favor seleccioná un archivo de imagen válido.", tipo: "danger" });
      return;
    }
    if (archivo.size > 2 * 1024 * 1024) {
      setMensaje({ texto: "La imagen es demasiado grande. El tamaño máximo es 2MB.", tipo: "danger" });
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const base64 = event.target.result;
      setFotoPerfil(base64);
      try {
        localStorage.setItem("profilePhoto_" + idUsuario, base64);
      } catch (error) {
        console.error("Error al guardar la foto en localStorage:", error);
        setMensaje({ texto: "No se pudo guardar la foto. Almacenamiento local lleno.", tipo: "danger" });
      }
    };
    reader.readAsDataURL(archivo);
  }

  function activarEdicion() {
    setModoEdicion(true);
    setDatosForm({
      nombre: datosUsuario.nombre_usuario || "",
      pais: datosUsuario.pais || "",
    });
    setMensaje({ texto: "", tipo: "" });
  }

  async function guardarCambios() {
    const nuevoNombre = datosForm.nombre.trim();
    const nuevoPais = datosForm.pais.trim();

    if (!nuevoNombre) {
      setMensaje({ texto: "El nombre completo no puede estar vacío.", tipo: "danger" });
      return;
    }

    const datosActualizados = {
      ...datosUsuario,
      nombre_usuario: nuevoNombre,
      pais: nuevoPais || null,
    };

    try {
      await usuariosService.actualizar(idUsuario, datosActualizados);
    } catch (e) {
      console.error("Error actualizando usuario:", e);
      setMensaje({ texto: "Error al guardar los cambios. ¿Está corriendo el backend?", tipo: "danger" });
      return;
    }

    setDatosUsuario(datosActualizados);
    setUsuarioEnContexto({ ...usuario, nombre_usuario: nuevoNombre });

    setModoEdicion(false);
    setMensaje({ texto: "", tipo: "" });

    setModal({
      titulo: "Cambios guardados",
      mensaje: "Tus datos personales fueron actualizados correctamente.",
      ocultarCancelar: true,
      textoBotonOk: "Aceptar",
      accion: () => setModal(null),
    });
  }

  function eliminarCuenta() {
    setModal({
      titulo: "¿ELIMINAR MI CUENTA?",
      mensaje: "Esta acción eliminará tu cuenta y todas tus compras de forma permanente.",
      textoBotonOk: "Confirmar",
      accion: async () => {
        try {
          await usuariosService.eliminar(idUsuario);
        } catch (e) {
          console.error("Error eliminando usuario:", e);
        }

        const compras = JSON.parse(localStorage.getItem("compras")) || [];
        const comprasDeOtros = compras.filter((c) => c.id_usuario !== idUsuario);
        localStorage.setItem("compras", JSON.stringify(comprasDeOtros));

        localStorage.removeItem("profilePhoto_" + idUsuario);

        setModal({
          titulo: "Cuenta eliminada",
          mensaje: "Tu perfil y compras fueron borrados con éxito. ¡Gracias por usar TicketApp!",
          ocultarCancelar: true,
          textoBotonOk: "Entendido",
          accion: () => {
            logout();
            navigate("/");
          },
        });
      },
    });
  }

  return (
    <div className="row g-4">
      <div className="col-lg-8">
        <div className="d-flex align-items-center gap-4 mb-4">
          <div className="position-relative" id="foto-perfil-container">
            <img
              id="foto-perfil"
              src={fotoPerfil || FOTO_PLACEHOLDER}
              alt="Foto de perfil"
              className="img-thumbnail"
              style={{ width: 120, height: 120, objectFit: "cover" }}
            />
            {modoEdicion && (
              <span
                id="foto-edit-badge"
                className="position-absolute top-0 end-0 bg-secondary text-white rounded-circle d-flex align-items-center justify-content-center"
                style={{ width: 30, height: 30, cursor: "pointer" }}
                onClick={() => inputFotoRef.current?.click()}
              >
                <i className="bi bi-pencil-fill" style={{ fontSize: "0.75rem" }} />
              </span>
            )}
            <input
              type="file"
              ref={inputFotoRef}
              accept="image/*"
              className="d-none"
              onChange={handleFotoChange}
            />
          </div>

          <div>
            <p className="h1 mb-0 text-danger fw-bold" id="perfil-nombre-header">
              {nombreCompleto}
            </p>
          </div>
        </div>

        <h2
          id="perfil-titulo-seccion"
          className={`text-uppercase fw-bold mb-4 ${modoEdicion ? "text-danger" : ""}`}
        >
          {modoEdicion ? "Configuraciones Generales" : "Datos Generales"}
        </h2>

        {!modoEdicion && (
          <div id="pantalla-lectura">
            <CampoLectura label="Nombre completo" valor={nombreCompleto} />
            <CampoLectura label="Correo electrónico" valor={email} />
            <CampoLectura label="País" valor={pais} />
            <CampoLectura label="Tipo de documento" valor={tipoDoc} />
            <CampoLectura label="Número de documento" valor={numDoc} />
          </div>
        )}

        {modoEdicion && (
          <div id="pantalla-edicion">
            <div className="mb-3 row">
              <label className="col-sm-2 col-form-label">Nombre completo</label>
              <div className="col-sm-10">
                <input
                  type="text"
                  className="form-control"
                  id="inputNombreCompleto"
                  placeholder="Nombre y Apellido"
                  value={datosForm.nombre}
                  onChange={(e) => setDatosForm((prev) => ({ ...prev, nombre: e.target.value }))}
                />
              </div>
            </div>

            <div className="mb-3 row">
              <label className="col-sm-2 col-form-label">País</label>
              <div className="col-sm-10">
                <select
                  className="form-select"
                  id="inputPais"
                  value={datosForm.pais}
                  onChange={(e) => setDatosForm((prev) => ({ ...prev, pais: e.target.value }))}
                >
                  <option value="" disabled>Seleccionar país</option>
                  {PAISES.map((p) => (
                    <option key={p} value={p}>{p}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="mb-3 row">
              <label className="col-sm-2 col-form-label">Correo electrónico</label>
              <div className="col-sm-10">
                <input
                  type="text"
                  readOnly
                  className="form-control-plaintext"
                  value={email}
                />
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="col-lg-4 d-flex align-items-start justify-content-center">
        <div className="d-grid gap-2 col-sm-8 col-lg-12 mx-auto mt-lg-5 pt-lg-5">
          <button
            className="btn btn-danger fw-bold text-uppercase"
            type="button"
            id="btnAction"
            onClick={modoEdicion ? guardarCambios : activarEdicion}
          >
            {modoEdicion ? "Guardar cambios" : "Configurar perfil"}
          </button>
          <button
            className="btn btn-outline-secondary fw-bold text-uppercase"
            type="button"
            id="btnDelete"
            onClick={eliminarCuenta}
          >
            Eliminar cuenta
          </button>
        </div>
      </div>
    </div>
  );
}

export default DatosPersonales;
