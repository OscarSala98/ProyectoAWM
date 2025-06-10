import React from 'react';
import './ModalConfirmacion.css';

const ModalConfirmacion = ({ visible, onClose, mensaje = "Cancelación exitosa!!", boton = "Salir" }) => {
  if (!visible) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-contenido">
        <button className="modal-cerrar" onClick={onClose}>✕</button>
        <h2>{mensaje}</h2>
        <button className="btn-modal" onClick={onClose}>{boton}</button>
      </div>
    </div>
  );
};

export default ModalConfirmacion;
