import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ReservasTabs from '../components/ReservasTabs';
import ReservaCard from '../components/ReservaCard';
import './Reservas.css';

const reservasMock = [
  {
    id: 1,
    tipo: 'futura',
    habitacion: 'Habitación Doble',
    checkIn: '12 May 2025',
    duracion: '2',
    personas: '1 Adulto, 1 Niño',
    precio: '$1000 USD',
    imagen: require('../assets/Habitaciones/HD303/HD303.webp'),
  },
  {
    id: 2,
    tipo: 'futura',
    habitacion: 'Habitación Delux',
    checkIn: '12 May 2025',
    duracion: '2 días',
    personas: '2 Adultos',
    precio: '$1000 USD',
    imagen: require('../assets/Habitaciones/HDE302/HDE302.webp'),
  },
  {
    id: 3,
    tipo: 'pasada',
    habitacion: 'Habitación Simple',
    checkIn: '01 Abr 2024',
    duracion: '3 días',
    personas: '1 Adulto',
    precio: '$800 USD',
    imagen: require('../assets/Habitaciones/HS303/HS303.webp'),
  }
];

const manejarAtras = () => {
  window.history.back();
};

const MisReservas = () => {
  const [tabActivo, setTabActivo] = useState('futura');

  const reservasFiltradas = reservasMock.filter(r => r.tipo === tabActivo);

  return (
    <div>
      <Header />
      <div className="reservas-container">
        <button className="btn-atras" onClick={manejarAtras}>Atrás</button>
        <h2 className="reservas-titulo">Mis Reservas</h2>

        <ReservasTabs tabActivo={tabActivo} setTabActivo={setTabActivo} />

        <div className="reservas-lista">
          {reservasFiltradas.map(reserva => (
            <ReservaCard key={reserva.id} reserva={reserva} />
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default MisReservas;
