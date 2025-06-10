import React from 'react';
import './PerfilOpciones.css';

const PerfilOpciones = () => {
  return (
    <div className="perfil-opciones">
      <ul>
        <li><strong>Mensajes</strong></li>
        <li><strong>Notificaciones</strong></li>
        <li><strong>Reservaciones</strong></li>
      </ul>
      <ul>
        <li>Cuenta</li>
        <li>Cerrar Sesión</li>
      </ul>
    </div>
  );
};

export default PerfilOpciones;
