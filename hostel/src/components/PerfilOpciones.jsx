import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './PerfilOpciones.css';
import ModalConfirmacionSiNo from './ModalConfirmacionSiNo'; 

const PerfilOpciones = () => {
  const navigate = useNavigate();
  const [mostrarModal, setMostrarModal] = useState(false);

  const usuario = JSON.parse(localStorage.getItem('usuario'));

  const confirmarCerrarSesion = () => {
    localStorage.removeItem('usuario');
    navigate('/');
  };

  return (
    <div className="perfil-opciones">
      <ul>
        <li onClick={() => navigate('/mensajes')}><strong>Mensajes</strong></li>
        <li onClick={() => navigate('/notificaciones')}><strong>Notificaciones</strong></li>
        <li onClick={() => navigate('/mis-reservas')}><strong>Reservaciones</strong></li>
      </ul>
      <ul>
        <li onClick={() => navigate('/perfil')}>Cuenta</li>
        <li onClick={() => setMostrarModal(true)}>Cerrar Sesión</li>
      </ul>

      <ModalConfirmacionSiNo
        visible={mostrarModal}
        onConfirmar={confirmarCerrarSesion}
        onCancelar={() => setMostrarModal(false)}
        mensaje="¿Estás seguro que deseas cerrar sesión?"
      />
    </div>
  );
};

export default PerfilOpciones;
