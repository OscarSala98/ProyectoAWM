import React from 'react';
import './HabitacionCard.css';
import { FaBed, FaShower, FaCar, FaPaw } from 'react-icons/fa';

const HabitacionCard = ({ titulo, descripcion, imagen, precio, camas, banos, parqueo, mascotas }) => {
  return (
    <div className="habitacion-card">
      <img src={imagen} alt={titulo} className="habitacion-img" />

      <div className="habitacion-info">
        <h3 className="habitacion-titulo">{titulo}</h3>
        <p className="habitacion-desc">{descripcion}</p>

        <div className="habitacion-iconos">
          <div><FaBed /> <span>{camas}</span></div>
          <div><FaShower /> <span>{banos}</span></div>
          <div><FaCar /> <span>{parqueo}</span></div>
          <div><FaPaw /> <span>{mascotas}</span></div>
        </div>

        <div className="habitacion-precio">{precio}</div>
      </div>
    </div>
  );
};

export default HabitacionCard;
