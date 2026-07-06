import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import { usuariosService } from "../services/usuariosService.js";
import ConfirmModal from "../components/ConfirmModal.jsx";
import DatosPersonales from "../components/DatosPersonales.jsx";
import HistorialCompras from "../components/HistorialCompras.jsx";

function Perfil() {
  const { usuario } = useAuth();
  const navigate = useNavigate();

  const [datosUsuario, setDatosUsuario] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [mensaje, setMensaje] = useState({ texto: "", tipo: "" });
  const [modal, setModal] = useState(null);

  useEffect(() => {
    if (!usuario) {
      navigate("/login");
    }
  }, [usuario, navigate]);

  useEffect(() => {
    if (!usuario) return;

    async function cargarDatos() {
      try {
        const respuesta = await usuariosService.listar();
        const lista = respuesta.usuarios || [];
        const encontrado = lista.find(
          (u) => u._id === usuario._id || u.id_usuario === usuario._id
        );
        if (encontrado) {
          setDatosUsuario(encontrado);
        }
      } catch (error) {
        console.error("Error al cargar datos del perfil:", error);
      } finally {
        setCargando(false);
      }
    }

    cargarDatos();
  }, [usuario]);

  if (!usuario) return null;
  if (cargando) {
    return (
      <div className="container py-5 text-center">
        <p className="text-muted">Cargando perfil...</p>
      </div>
    );
  }
  if (!datosUsuario) {
    return (
      <div className="container py-5 text-center">
        <p className="text-danger">No se encontraron los datos del usuario.</p>
      </div>
    );
  }

  const idUsuario = datosUsuario._id || datosUsuario.id_usuario;

  return (
    <main className="container my-5 flex-grow-1">
      {mensaje.texto && (
        <div className={`alert alert-${mensaje.tipo || "info"} text-center`} role="alert">
          {mensaje.texto}
        </div>
      )}

      <DatosPersonales
        datosUsuario={datosUsuario}
        setDatosUsuario={setDatosUsuario}
        setMensaje={setMensaje}
        setModal={setModal}
      />

      <HistorialCompras idUsuario={idUsuario} />

      <ConfirmModal modal={modal} setModal={setModal} />
    </main>
  );
}

export default Perfil;
