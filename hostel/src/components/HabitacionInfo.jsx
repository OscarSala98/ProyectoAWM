import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaBed, FaShower, FaCar, FaPaw } from 'react-icons/fa';
import authService from '../services/authService';
import ModalConfirmacion from './ModalConfirmacion';
import './HabitacionInfo.css';

const HabitacionInfo = ({ habitacion }) => {
  const navigate = useNavigate();
  const [mostrarAlerta, setMostrarAlerta] = useState(false);

  const manejarReserva = () => {
    const isAuthenticated = authService.isAuthenticated();
    if (!isAuthenticated) {
      setMostrarAlerta(true);
      return;
    }
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
      
      <ModalConfirmacion
        mensaje="Debe iniciar sesión para reservar una habitación."
        visible={mostrarAlerta}
        onClose={() => setMostrarAlerta(false)}
      />
    </div>
  );
};

export default HabitacionInfo;