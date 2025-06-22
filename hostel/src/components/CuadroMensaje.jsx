import React from 'react';
import './CuadroMensaje.css';

const CuadroMensaje = ({ contacto, activo, onClick }) => {
  const nombreCompleto = `${contacto.primerNombre} ${contacto.primerApellido}`;
  const ultimaConexion = contacto.ultimaConexion || 'sin registro';

  const obtenerIniciales = () => {
    const inicial1 = contacto.primerNombre?.charAt(0).toUpperCase() || '';
    const inicial2 = contacto.primerApellido?.charAt(0).toUpperCase() || '';
    return `${inicial1}${inicial2}`;
  };

  return (
    <div
      className={`cuadro-mensaje ${activo ? 'activo' : ''}`}
      onClick={onClick}
    >
      <div className="avatar-placeholder">
        {contacto.foto ? (
          <img src={contacto.foto} alt="avatar" className="avatar-imagen" />
        ) : (
          <div className="avatar-iniciales">{obtenerIniciales()}</div>
        )}
      </div>
      <div className="contacto-info">
        <strong>{nombreCompleto}</strong>
        <p>Última conexión el {ultimaConexion}</p>
      </div>
    </div>
  );
};

export default CuadroMensaje;
