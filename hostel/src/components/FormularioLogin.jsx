import React, { useState } from 'react';
import './FormularioLogin.css';
import FormularioRecuperar from './FormularioRecuperar';

const FormularioLogin = ({ onClose }) => {
  const [mostrarRecuperar, setMostrarRecuperar] = useState(false);

  return (
    <>
      {!mostrarRecuperar ? (
        <div className="modal-overlay">
          <div className="modal-content">
            <button className="close-btn" onClick={onClose}>✕</button>
            <h3>Iniciar Sesión</h3>

            <input type="email" placeholder="Ingrese su correo" />
            <input type="password" placeholder="Ingrese su contraseña" />

            <p className="link" onClick={() => setMostrarRecuperar(true)}>
              ¿Olvidaste tu contraseña?
            </p>

            <button className="btn-principal">Ingresar</button>
            <button className="btn-admin">Admin</button>
          </div>
        </div>
      ) : (
        <FormularioRecuperar onClose={() => setMostrarRecuperar(false)} />
      )}
    </>
  );
};

export default FormularioLogin;
