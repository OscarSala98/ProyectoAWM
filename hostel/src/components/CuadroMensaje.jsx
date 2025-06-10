import React from 'react';
import './CuadroMensaje.css';

const CuadroMensaje = ({ contacto, activo, onClick }) => {
  return (
    <div
      className={`cuadro-mensaje ${activo ? 'activo' : ''}`}
      onClick={onClick}
    >
      <div className="avatar-placeholder" />
      <div className="contacto-info">
        <strong>{contacto.nombre}</strong>
        <p>Última conexión el {contacto.ultimaConexion}</p>
      </div>
    </div>
  );
};

export default CuadroMensaje;
