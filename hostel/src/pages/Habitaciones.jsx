import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import HabitacionCard from '../components/HabitacionCard';
import './Habitaciones.css';

// Importa las imágenes
import imgSimple from '../assets/HS103.webp';
import imgDoble from '../assets/HD103.webp';
import imgDelux from '../assets/HDE302.webp';

const Habitaciones = () => {
  const habitaciones = [
    { titulo: 'Habitación Simple 103', precio: '$1000 - $5000 USD', descripcion: '2 Plazas', imagen: imgSimple },
    { titulo: 'Habitación Doble 103', precio: '$1000 - $5000 USD', descripcion: '2 Plazas y 1½ Plazas', imagen: imgDoble },
    { titulo: 'Habitación Delux 302', precio: '$1000 - $5000 USD', descripcion: '3 Plazas y Yacuzzi', imagen: imgDelux },
    { titulo: 'Habitación Simple 103', precio: '$1000 - $5000 USD', descripcion: '2 Plazas', imagen: imgSimple },
    { titulo: 'Habitación Doble 103', precio: '$1000 - $5000 USD', descripcion: '2 Plazas y 1½ Plazas', imagen: imgDoble },
    { titulo: 'Habitación Delux 302', precio: '$1000 - $5000 USD', descripcion: '3 Plazas y Yacuzzi', imagen: imgDelux },
  ];

  return (
    <div>
      <Header />
      <div className="habitaciones-container">
        <h2 className="habitaciones-title">Nuestras Habitaciones</h2>
        <div className="habitaciones-grid">
          {habitaciones.map((h, index) => (
            <HabitacionCard
              key={index}
              titulo={h.titulo}
              precio={h.precio}
              descripcion={h.descripcion}
              imagen={h.imagen}
            />
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Habitaciones;

