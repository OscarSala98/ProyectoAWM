import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

import HabitacionCardGeneral from '../components/HabitacionCardGeneral';
import HabitacionInfo from '../components/HabitacionInfo';
import HabitacionDescripcion from '../components/HabitacionDescripcion';
import './HabitacionDetalle.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const URLbase = 'http://localhost:3002/api/';

const HabitacionDetalle = () => {
  const [habitacion, setHabitacion] = React.useState(null);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    axios.get(`${URLbase}habitaciones/${id}`)
      .then((response) => {
        setHabitacion(response.data);
      })
      .catch((error) => {
        console.error('Error al obtener la habitación:', error);
      });
  }, [id]);

  if (!habitacion) {
    return <p style={{ textAlign: 'center' }}>Habitación no encontrada</p>;
  }

  const imagenes = [
    `/Habitaciones/${habitacion.id_habitacion}/${habitacion.id_habitacion}.webp`,
    `/Habitaciones/${habitacion.id_habitacion}/${habitacion.id_habitacion}_secundario.webp`,
    `/Habitaciones/${habitacion.id_habitacion}/${habitacion.id_habitacion}_bano.webp`,
    `/Habitaciones/${habitacion.id_habitacion}/${habitacion.id_habitacion}_sala.webp`,
    `/Habitaciones/${habitacion.id_habitacion}/${habitacion.id_habitacion}_secundario2.webp`
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
