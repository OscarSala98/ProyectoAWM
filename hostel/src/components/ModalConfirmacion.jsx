import React from 'react';
import './ModalConfirmacion.css';

const ModalConfirmacion = ({ visible, onClose, onConfirm, mensaje }) => {
  if (!visible) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <p>{mensaje}</p>
        <div className="modal-botones">
          <button onClick={onConfirm}>Sí</button>
          <button onClick={onClose}>No</button>
        </div>
      </div>
    </div>
  );
};

export default ModalConfirmacion;
