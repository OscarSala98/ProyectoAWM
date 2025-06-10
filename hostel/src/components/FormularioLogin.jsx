import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './FormularioLogin.css';
import FormularioRecuperar from './FormularioRecuperar';

const FormularioLogin = ({ onClose }) => {
  const [mostrarRecuperar, setMostrarRecuperar] = useState(false);

    const navigate = useNavigate();

  const manejarLogin = () => {
    onClose(); // Cierra modal
    navigate('/perfil'); // Redirige
  };
  
  const manejarAdmin = () => {
    onClose(); // Cierra modal
    navigate('/admin/perfil'); // Redirige a admin
  }
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

            <button className="btn-principal" onClick={manejarLogin}>Ingresar</button>
            <button className="btn-admin" onClick={manejarAdmin}>Admin</button>
          </div>
        </div>
      ) : (
        <FormularioRecuperar onClose={() => setMostrarRecuperar(false)} />
      )}
    </>
  );
};

export default FormularioLogin;
