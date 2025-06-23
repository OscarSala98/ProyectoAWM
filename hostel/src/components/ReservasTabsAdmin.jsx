import React from 'react';
import './ReservasTabs.css';

const ReservasTabsAdmin = ({ tabActivo, setTabActivo }) => {
  return (
    <div className="reservas-tabs">
      <button
        className={tabActivo === 'confirmada' ? 'activo' : ''}
        onClick={() => setTabActivo('confirmada')}
      >
        Confirmadas
      </button>
      <button
        className={tabActivo === 'aceptada' ? 'activo' : ''}
        onClick={() => setTabActivo('aceptada')}
      >
        Aceptadas
      </button>
      <button
        className={tabActivo === 'rechazada' ? 'activo' : ''}
        onClick={() => setTabActivo('rechazada')}
      >
        Rechazadas
      </button>
    </div>
  );
};

export default ReservasTabsAdmin;
