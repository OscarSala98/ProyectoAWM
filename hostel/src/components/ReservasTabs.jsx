// src/components/ReservasTabs.jsx
import React from 'react';
import './ReservasTabs.css';

const ReservasTabs = ({ tabActivo, setTabActivo }) => {
  return (
    <div className="reservas-tabs">
      <button
        className={tabActivo === 'futura' ? 'activo' : ''}
        onClick={() => setTabActivo('futura')}
      >
        Futuras
      </button>
      <button
        className={tabActivo === 'pasada' ? 'activo' : ''}
        onClick={() => setTabActivo('pasada')}
      >
        Pasadas
      </button>
    </div>
  );
};

export default ReservasTabs;
