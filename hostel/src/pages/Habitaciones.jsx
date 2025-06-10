import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import FiltroHabitaciones from '../components/FiltroHabitaciones';
import HabitacionCard from '../components/HabitacionCard';
import './Habitaciones.css';

import habitaciones from '../data/dataHabitaciones';

const Habitaciones = () => {
  return (
    <div>
      <Header />
      <FiltroHabitaciones />

      <div className="habitaciones-container">
        <h2 className="habitaciones-title">Todas las Habitaciones</h2>
        <div className="habitaciones-grid">
          {habitaciones.map((h) => (
            <HabitacionCard key={h.id} {...h} imagen={h.portada} />
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Habitaciones;
