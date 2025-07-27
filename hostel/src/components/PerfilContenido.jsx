import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import ModalConfirmacionSiNo from './ModalConfirmacionSiNo';
import ModalConfirmacion from './ModalConfirmacion';
import './PerfilContenido.css';

const URLbase = 'http://localhost:3002/api/v1/';

const PerfilContenido = () => {
  const [usuario, setUsuario] = useState(null);
  const [mostrarModal, setMostrarModal] = useState(false);
  const [mostrarConfirmacion, setMostrarConfirmacion] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const datosLocal = JSON.parse(localStorage.getItem('usuario'));
    if (datosLocal?.id) {
      axios.get(`${URLbase}personas/${datosLocal.id}`)
        .then((res) => {
          setUsuario(res.data);
        })
        .catch(() => {
          console.error('Error al obtener los datos del usuario');
        });
    }
  }, []);

  const manejarEdicion = () => {
    navigate(usuario?.tipo === 'admin' ? '/admin/editar-perfil' : '/editar-perfil');
  };

  const confirmarEliminacion = () => {
    axios.delete(`${URLbase}personas/${usuario.id}`)
      .then(() => {
        localStorage.removeItem('usuario');
        setMostrarModal(false);
        setMostrarConfirmacion(true);
      })
      .catch(() => {
        alert('❌ Error al eliminar la cuenta');
        setMostrarModal(false);
      });
  };

  const cerrarConfirmacion = () => {
    setMostrarConfirmacion(false);
    navigate('/');
  };

  if (!usuario) return <p>Cargando perfil...</p>;

  return (
    <>
      <div className="perfil-contenido">
        <h2>Hola, {usuario.primerNombre}</h2>

        <div className="perfil-detalles">
          <p><strong>Nombre completo:</strong> {usuario.primerNombre} {usuario.segundoNombre} {usuario.primerApellido}</p>
          <p><strong>Correo:</strong> {usuario.correo}</p>
          <p><strong>Teléfono:</strong> {usuario.numero}</p>
          <p><strong>Rol:</strong> {usuario.tipo}</p>
        </div>

        <button className="btn-editar" onClick={manejarEdicion}>Editar Perfil</button>
        <br />
        <button className="btn-eliminar" onClick={() => setMostrarModal(true)}>Eliminar Cuenta</button>
      </div>

      <ModalConfirmacionSiNo
        visible={mostrarModal}
        mensaje="¿Estás seguro de que deseas eliminar tu cuenta? Esta acción no se puede deshacer."
        onConfirmar={confirmarEliminacion}
        onCancelar={() => setMostrarModal(false)}
      />

      <ModalConfirmacion
        visible={mostrarConfirmacion}
        mensaje="✅ Cuenta eliminada correctamente."
        onClose={cerrarConfirmacion}
      />
    </>
  );
};

export default PerfilContenido;

