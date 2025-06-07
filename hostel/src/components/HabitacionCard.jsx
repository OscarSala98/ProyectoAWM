import React from 'react';
import './HabitacionCard.css';

const HabitacionCard = ({ titulo, precio, descripcion, imagen }) => {
  return (
    <div className="habitacion-card">
      <img src={imagen} alt={titulo} className="habitacion-img" />
      <div className="habitacion-info">
        <p className="habitacion-precio">{precio}</p>
        <h3 className="habitacion-titulo">{titulo}</h3>
        <p className="habitacion-desc">{descripcion}</p>
      </div>
    </div>
  );
};

export default HabitacionCard;

