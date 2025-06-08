import React from 'react'; // Importa React, necesario para crear componentes en JSX.
import Header from '../components/Header'; // Importa el componente Header que contiene la barra de navegación.
import Footer from '../components/Footer'; // Importa el componente Footer que contiene la información de contacto y otros enlaces.
import FiltroHabitaciones from '../components/FiltroHabitaciones'; // Importa el componente FiltroHabitaciones que permite filtrar las habitaciones por tipo.
import HabitacionCard from '../components/HabitacionCard'; // Importa el componente HabitacionCard que muestra la información de cada habitación.
import './Habitaciones.css'; // Importa el archivo de estilos CSS personalizado para este componente.

import imgSimple from '../assets/HS103.webp'; // Importa la imagen de la habitación "Simple".
import imgDoble from '../assets/HD103.webp'; // Importa la imagen de la habitación "Doble".
import imgDelux from '../assets/HDE302.webp'; // Importa la imagen de la habitación "Delux".

// Componente funcional Habitaciones que representa la página de todas las habitaciones.
const Habitaciones = () => {
  // Define un array de habitaciones disponibles con detalles como el título, tipo, precio, etc.
  const habitaciones = [
    {
      titulo: 'Habitación Simple 103',
      tipo: 'Simple',
      precio: '$1000 - $5000 USD',
      descripcion: '2 Plazas',
      imagen: imgSimple,
      camas: 1,
      banos: 1,
      parqueo: 1,
      mascotas: 0
    },
    {
      titulo: 'Habitación Simple 102',
      tipo: 'Simple',
      precio: '$1000 - $5000 USD',
      descripcion: '2 Plazas',
      imagen: imgSimple,
      camas: 1,
      banos: 1,
      parqueo: 1,
      mascotas: 0
    },
    {
      titulo: 'Habitación Doble 103',
      tipo: 'Doble',
      precio: '$1000 - $5000 USD',
      descripcion: '2 Plazas y 1½ Plazas',
      imagen: imgDoble,
      camas: 2,
      banos: 1,
      parqueo: 1,
      mascotas: 1
    },
    {
      titulo: 'Habitación Doble 304',
      tipo: 'Doble',
      precio: '$1000 - $5000 USD',
      descripcion: '2 Plazas y 1½ Plazas',
      imagen: imgDoble,
      camas: 2,
      banos: 1,
      parqueo: 1,
      mascotas: 1
    },
    {
      titulo: 'Habitación Delux 302',
      tipo: 'Delux',
      precio: '$1000 - $5000 USD',
      descripcion: '3 Plazas y Yacuzzi',
      imagen: imgDelux,
      camas: 3,
      banos: 2,
      parqueo: 2,
      mascotas: 1
    }
  ];

  return (
    <div>
      <Header /> {/* Componente Header que contiene la barra de navegación en la parte superior */}

      <FiltroHabitaciones /> {/* Componente FiltroHabitaciones que permite filtrar las habitaciones */}
      
      {/* Contenedor principal para las habitaciones */}
      <div className="habitaciones-container">
        <h2 className="habitaciones-title">Todas las Habitaciones</h2> {/* Título principal de la página */}
        
        {/* Contenedor para mostrar las habitaciones en formato de grid */}
        <div className="habitaciones-grid">
          {/* Mapea el array de habitaciones y pasa cada habitación como props a HabitacionCard */}
          {habitaciones.map((h, index) => (
            <HabitacionCard key={index} {...h} /> // Utiliza el spread operator para pasar todas las propiedades de la habitación a HabitacionCard
          ))}
        </div>
      </div>

      <Footer /> {/* Componente Footer que contiene información adicional al final de la página */}
    </div>
  );
};

export default Habitaciones; // Exporta el componente Habitaciones para que pueda ser utilizado en otras partes de la aplicación.
