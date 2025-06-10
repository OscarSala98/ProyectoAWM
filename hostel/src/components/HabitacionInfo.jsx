import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaBed, FaShower, FaCar, FaPaw } from 'react-icons/fa';
import './HabitacionInfo.css';

const HabitacionInfo = ({ habitacion }) => {
  const navigate = useNavigate();

  const manejarReserva = () => {
    navigate('/reservas', { state: { habitacion } });
  };

  return (
    <div className="habitacion-info-box">
      <h2>{habitacion.titulo}</h2>
      <div className="habitacion-iconos">
        <div><FaBed /> {habitacion.camas} Cama{habitacion.camas > 1 ? 's' : ''}</div>
        <div><FaShower /> {habitacion.banos} Baño{habitacion.banos > 1 ? 's' : ''}</div>
        <div><FaCar /> {habitacion.parqueo} Auto{habitacion.parqueo > 1 ? 's' : ''}</div>
        <div><FaPaw /> {habitacion.mascotas} Mascota{habitacion.mascotas > 1 ? 's' : ''}</div>
      </div>

      <div className="habitacion-precios">
        <h3>{habitacion.precio}</h3>
        <ul>
          <li>Short Period: {habitacion.precioDesglose?.corto}</li>
          <li>Medium Period: {habitacion.precioDesglose?.medio}</li>
          <li>Long Period: {habitacion.precioDesglose?.largo}</li>
        </ul>
        <button className="btn-reservar" onClick={manejarReserva}>Reserve Ahora</button>
      </div>
    </div>
  );
};

export default HabitacionInfo;