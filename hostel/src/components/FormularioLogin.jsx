import React from 'react';
import './FormularioLogin.css';

const FormularioLogin = ({ onClose }) => {
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="close-btn" onClick={onClose}>✕</button>
        <h3>Iniciar Sesion</h3>

        <input type="email" placeholder="Ingrese su correo" />
        <input type="password" placeholder="Ingrese su contraseña" />
        <p className="link">¿Olvidaste tu contraseña?</p>

        <button className="btn-principal">Ingresar</button>
        <button className="btn-admin">Admin</button>
      </div>
    </div>
  );
};

export default FormularioLogin;
