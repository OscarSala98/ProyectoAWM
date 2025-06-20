import React from 'react';
import './ModalConfirmacionSiNo.css';

const ModalConfirmacionSiNo = ({ visible, mensaje = "¿Estás seguro?", onConfirmar, onCancelar }) => {
  if (!visible) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-contenido">
        <h2>{mensaje}</h2>
        <div className="modal-botones">
          <button className="btn-confirmar" onClick={onConfirmar}>Sí</button>
          <button className="btn-cancelar" onClick={onCancelar}>No</button>
        </div>
      </div>
    </div>
  );
};

export default ModalConfirmacionSiNo;
