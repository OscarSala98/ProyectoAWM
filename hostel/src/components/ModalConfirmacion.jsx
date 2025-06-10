// src/components/ModalConfirmacion.jsx
import React from 'react';
import './ModalConfirmacion.css';

const ModalConfirmacion = ({ visible, onClose }) => {
  if (!visible) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-contenido">
        <button className="modal-cerrar" onClick={onClose}>✕</button>
        <h2>Cancelación exitosa!!</h2>
        <button className="btn-modal" onClick={onClose}>Salir</button>
      </div>
    </div>
  );
};

export default ModalConfirmacion;
