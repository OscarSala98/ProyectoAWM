import React from 'react';
import { useNavigate } from 'react-router-dom';
import './PerfilOpciones.css';

const PerfilOpcionesAdmin = () => {
  const navigate = useNavigate();

  return (
    <div className="perfil-opciones">
      <ul>
        <li onClick={() => navigate('/admin/chat')}><strong>Mensajes</strong></li>
        <li onClick={() => navigate('/admin/notificaciones')}><strong>Notificaciones</strong></li>
        <li onClick={() => navigate('/admin/reservaciones')}><strong>Reservaciones</strong></li>
      </ul>
      <ul>
        <li onClick={() => navigate('/admin/perfil')}>Cuenta</li>
        <li onClick={() => navigate('/')}>Cerrar Sesión</li>
      </ul>
      <ul>
        <li onClick={() => navigate('/admin/editar-habitacion')}><strong>Editar Habitación</strong></li>
      </ul>
    </div>
  );
};

export default PerfilOpcionesAdmin;
