import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Unauthorized.css';

const Unauthorized = () => {
  const navigate = useNavigate();

  return (
    <div className="unauthorized-container">
      <div className="unauthorized-content">
        <h1>🚫 Acceso Denegado</h1>
        <p>No tienes permisos para acceder a esta página.</p>
        <div className="unauthorized-buttons">
          <button onClick={() => navigate('/')} className="btn-home">
            Ir al Inicio
          </button>
          <button onClick={() => navigate(-1)} className="btn-back">
            Volver Atrás
          </button>
        </div>
      </div>
    </div>
  );
};

export default Unauthorized;
