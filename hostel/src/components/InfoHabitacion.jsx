import React from 'react';
import './InfoHabitacion.css';

const InfoHabitacion = () => {
  return (
    <div className="info-habitacion">
      <div className="info-habitacion-grupo">
        <div className="campo">
          <label>Número de Habitación</label>
          <input type="text" placeholder="Ej: 101" />
        </div>
        <div className="campo">
          <label>Tipo de Habitación</label>
          <input type="text" placeholder="Ej: Doble, Simple, Delux" />
        </div>
      </div>

      <div className="info-habitacion-grupo">
        <div className="campo">
          <label>Capacidad (personas)</label>
          <input type="number" min="1" placeholder="Ej: 2" />
        </div>
        <div className="campo">
          <label>Piso / Ubicación</label>
          <input type="text" placeholder="Ej: Segundo Piso, ala norte" />
        </div>
      </div>
    </div>
  );
};

export default InfoHabitacion;
