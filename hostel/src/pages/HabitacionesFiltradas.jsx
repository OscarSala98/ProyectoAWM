import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import FiltroHabitaciones from '../components/FiltroHabitaciones';
import habitaciones from '../data/dataHabitaciones';
import ResultadosHabitaciones from '../components/ResultadosHabitaciones';
import MapaHabitaciones from '../components/MapaHabitaciones';
import './HabitacionesFiltradas.css';

const HabitacionesFiltradas = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [tipoSeleccionado, setTipoSeleccionado] = useState(null);

  useEffect(() => {
    if (location.state && location.state.tipo) {
      setTipoSeleccionado(location.state.tipo);
    } else {
      navigate('/habitaciones');
    }
  }, [location.state, navigate]);

  if (!tipoSeleccionado) return null;

  const habitacionesFiltradas = habitaciones.filter(h => h.tipo === tipoSeleccionado);

  return (
    <div>
      <Header />
      <FiltroHabitaciones />

      
      <div className="habitaciones-filtradas-wrapper">
        <div className="habitaciones-filtradas-grid">
            <ResultadosHabitaciones
              habitacionesFiltradas={habitacionesFiltradas}
              tipoSeleccionado={tipoSeleccionado}
            />
            <MapaHabitaciones />
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default HabitacionesFiltradas;
