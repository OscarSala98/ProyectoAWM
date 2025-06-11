import React from 'react';
import { useParams } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import habitaciones from '../data/dataHabitaciones';
import HabitacionCardGeneral from '../components/HabitacionCardGeneral';
import HabitacionInfo from '../components/HabitacionInfo';
import HabitacionDescripcion from '../components/HabitacionDescripcion';
import './HabitacionDetalle.css';
import { useNavigate } from 'react-router-dom';

const HabitacionDetalle = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const habitacion = habitaciones.find(h => h.id === id);

  if (!habitacion) {
    return <p style={{ textAlign: 'center' }}>Habitación no encontrada</p>;
  }

  const imagenes = [
    require(`../assets/Habitaciones/${id}/${id}.webp`),
    require(`../assets/Habitaciones/${id}/${id}_secundario.webp`),
    require(`../assets/Habitaciones/${id}/${id}_bano.webp`),
    require(`../assets/Habitaciones/${id}/${id}_sala.webp`),
    require(`../assets/Habitaciones/${id}/${id}_secundario2.webp`)
  ];

  return (
    <div>
      <Header />
      <div className="detalle-container">
        <button className="btn-atras" onClick={() => navigate(-1)}>Atrás</button>
        <HabitacionCardGeneral imagenes={imagenes} />
        <div className="detalle-info-wrapper">
          <div className="detalle-izquierda">
            <HabitacionInfo habitacion={habitacion} />
          </div>
          <div className="detalle-derecha">
            <HabitacionDescripcion habitacion={habitacion} />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default HabitacionDetalle;
