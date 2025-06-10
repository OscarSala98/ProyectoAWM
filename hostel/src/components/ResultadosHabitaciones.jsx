// src/components/ResultadosHabitaciones.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import HabitacionCard from './HabitacionCard';
import './ResultadosHabitaciones.css';

const ResultadosHabitaciones = ({ habitacionesFiltradas, tipoSeleccionado }) => {
  const navigate = useNavigate();

  return (
    <div className="habitaciones-lista">
      <div className="habitaciones-filtradas-header">
        <h2>{habitacionesFiltradas.length} Resultados encontrados</h2>
        <div className="filtro-activo">
          <span className="tag">Habitación {tipoSeleccionado}</span>
          <button className="btn-limpiar" onClick={() => navigate('/habitaciones')}>X</button>
        </div>
      </div>

      {habitacionesFiltradas.map((h, index) => (
        <HabitacionCard key={index} {...h} imagen={h.portada} />
      ))}
    </div>
  );
};

export default ResultadosHabitaciones;
