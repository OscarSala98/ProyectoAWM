import React from 'react';
import { useNavigate } from 'react-router-dom';
import './FiltroHabitaciones.css';

const FiltroHabitaciones = () => {
  const navigate = useNavigate();

  const manejarFiltro = (tipo) => {
    navigate('/habitaciones-filtradas', { state: { tipo } });
  };

  return (
    <div className="filtros-contenedor">
      <button onClick={() => manejarFiltro('Simple')}>Habitación Simple</button>
      <span className="punto">•</span>
      <button onClick={() => manejarFiltro('Doble')}>Habitación Doble</button>
      <span className="punto">•</span>
      <button onClick={() => manejarFiltro('Delux')}>Habitación Delux</button>
    </div>
  );
};

export default FiltroHabitaciones;
