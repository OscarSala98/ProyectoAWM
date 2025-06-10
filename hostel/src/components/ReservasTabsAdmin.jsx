import React from 'react';
import './ReservasTabs.css';

const ReservasTabsAdmin = ({ tabActivo, setTabActivo }) => {
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
