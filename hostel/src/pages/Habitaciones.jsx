import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import FiltroHabitaciones from '../components/FiltroHabitaciones';
import HabitacionCard from '../components/HabitacionCard';
import './Habitaciones.css';

import imgSimple from '../assets/HS103.webp';
import imgDoble from '../assets/HD103.webp';
import imgDelux from '../assets/HDE302.webp';

const Habitaciones = () => {
  const habitaciones = [
    { titulo: 'Habitación Simple 103', tipo: 'Simple', precio: '$1000 - $5000 USD', descripcion: '2 Plazas', imagen: imgSimple },
    { titulo: 'Habitación Simple 102', tipo: 'Simple', precio: '$1000 - $5000 USD', descripcion: '2 Plazas', imagen: imgSimple },
    { titulo: 'Habitación Doble 103', tipo: 'Doble', precio: '$1000 - $5000 USD', descripcion: '2 Plazas y 1½ Plazas', imagen: imgDoble },
    { titulo: 'Habitación Doble 304', tipo: 'Doble', precio: '$1000 - $5000 USD', descripcion: '2 Plazas y 1½ Plazas', imagen: imgDoble },
    { titulo: 'Habitación Delux 302', tipo: 'Delux', precio: '$1000 - $5000 USD', descripcion: '3 Plazas y Yacuzzi', imagen: imgDelux },
  ];

  return (
    <div>
      <Header />
      <FiltroHabitaciones />

      <div className="habitaciones-container">
        <h2 className="habitaciones-title">Todas las Habitaciones</h2>
        <div className="habitaciones-grid">
          {habitaciones.map((h, index) => (
            <HabitacionCard key={index} {...h} />
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Habitaciones;
