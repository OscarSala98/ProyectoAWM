import React from 'react';
import { useNavigate } from 'react-router-dom';
import './PerfilOpciones.css';

const PerfilOpciones = () => {
  const navigate = useNavigate();

  const manejarCerrarSesion = () => {
    // Elimina usuario del localStorage
    localStorage.removeItem('usuario');

    // Redirige al inicio
    navigate('/');
  };

  return (
    <div className="perfil-opciones">
      <ul>
        <li onClick={() => navigate('/chat')}><strong>Mensajes</strong></li>
        <li onClick={() => navigate('/notificaciones')}><strong>Notificaciones</strong></li>
        <li onClick={() => navigate('/mis-reservas')}><strong>Reservaciones</strong></li>
      </ul>
      <ul>
        <li onClick={() => navigate('/perfil')}>Cuenta</li>
        <li onClick={manejarCerrarSesion}>Cerrar Sesión</li>
      </ul>
    </div>
  );
};

export default PerfilOpciones;
