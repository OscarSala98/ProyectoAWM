import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './PerfilOpciones.css';
import ModalConfirmacionSiNo from './ModalConfirmacionSiNo';

const PerfilOpcionesAdmin = () => {
  const [mostrarModal, setMostrarModal] = useState(false);
  const navigate = useNavigate();

  const usuario = JSON.parse(localStorage.getItem('usuario')); // <- obtenemos el admin logueado

  const confirmarCerrarSesion = () => {
    localStorage.removeItem('usuario');
    navigate('/');
  };

  return (
    <>
      <div className="perfil-opciones">
        <ul>
          <li onClick={() => navigate('/admin/mensajes')}><strong>Mensajes</strong></li>
          <li onClick={() => navigate('/admin/notificaciones')}><strong>Notificaciones</strong></li>
          <li onClick={() => navigate('/admin/reservaciones')}><strong>Reservaciones</strong></li>
        </ul>
        <ul>
          <li onClick={() => navigate('/admin/perfil')}>Cuenta</li>
          <li onClick={() => setMostrarModal(true)}>Cerrar Sesión</li>
        </ul>
        <ul>
          <li onClick={() => navigate('/admin/editar-habitacion')}><strong>Editar Habitación</strong></li>
        </ul>
      </div>

      <ModalConfirmacionSiNo
        visible={mostrarModal}
        mensaje="¿Estás seguro de que deseas cerrar sesión?"
        onConfirmar={() => {
          setMostrarModal(false);
          confirmarCerrarSesion();
        }}
        onCancelar={() => setMostrarModal(false)}
      />
    </>
  );
};

export default PerfilOpcionesAdmin;
