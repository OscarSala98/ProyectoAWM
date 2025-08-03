import React from 'react';
import { useNavigate } from 'react-router-dom';
import './BookingForm.css';

const BookingForm = () => {
  const navigate = useNavigate();

  const manejarFiltro = (tipo) => {
    navigate('/habitaciones-filtradas', { state: { tipo } });
  };

  return (
    <div className="bookingform-filtros-contenedor">
      <button onClick={() => manejarFiltro('Simple')}>Habitación Simple</button>
      <span className="bookingform-punto">•</span>
      <button onClick={() => manejarFiltro('Doble')}>Habitación Doble</button>
      <span className="bookingform-punto">•</span>
      <button onClick={() => manejarFiltro('Delux')}>Habitación Delux</button>

    </div>
  );
};

export default BookingForm;
