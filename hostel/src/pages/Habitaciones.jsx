import React, {useEffect, useState} from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import FiltroHabitaciones from '../components/FiltroHabitaciones';
import HabitacionCard from '../components/HabitacionCard';
import './Habitaciones.css';
import axios from 'axios';

const URLbase = 'http://localhost:3002/api/';

const Habitaciones = () => {
  const [habitaciones, setHabitaciones] = useState([]);
  useEffect(() => {
    axios.get(`${URLbase}habitaciones`)
    .then((response) => {
      setHabitaciones(response.data);
    })
    .catch((error) => {
      console.error('Error al obtener habitaciones:', error);
    });
  },[]);

  return (
    <div className="page-layout">
      <div className="page-content">
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
      </div>

      <Footer />
    </div>
  );
};

export default Habitaciones;
