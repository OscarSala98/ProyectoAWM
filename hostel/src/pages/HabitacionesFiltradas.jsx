import React, { useEffect, useState } from 'react'; // Importa React y los hooks useEffect y useState para manejar el estado y efectos secundarios.
import { useLocation, useNavigate } from 'react-router-dom'; // Importa hooks de React Router para gestionar la ubicación actual y la navegación.
import Header from '../components/Header'; // Importa el componente Header, que contiene la barra de navegación.
import Footer from '../components/Footer'; // Importa el componente Footer, que contiene información al final de la página.
import FiltroHabitaciones from '../components/FiltroHabitaciones'; // Importa el componente FiltroHabitaciones, que permite filtrar las habitaciones.

import HabitacionCard from '../components/HabitacionCard'; // Importa el componente HabitacionCard para mostrar la información de cada habitación.

import imgSimple from '../assets/HS103.webp'; // Importa las imágenes de las habitaciones.
import imgDoble from '../assets/HD103.webp';
import imgDelux from '../assets/HDE302.webp';

const HabitacionesFiltradas = () => {
  // Inicializa el hook useNavigate para permitir la navegación a otras rutas.
  const location = useLocation(); 
  const navigate = useNavigate();

  // Inicializa el estado tipoSeleccionado a null. Este estado guarda el tipo de habitación seleccionado.
  const [tipoSeleccionado, setTipoSeleccionado] = useState(null);

  // Lista de habitaciones disponibles (se simula la base de datos).
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

  // useEffect para actualizar el tipoSeleccionado cuando se pasa desde la ruta
  useEffect(() => {
    if (location.state && location.state.tipo) {
      setTipoSeleccionado(location.state.tipo); // Si hay un tipo de habitación pasado en el estado de la ubicación, se actualiza el estado.
    } else {
      navigate('/habitaciones'); // Si no hay tipo, redirige a la página de habitaciones.
    }
  }, [location.state, navigate]); // Dependencias: se ejecuta cuando `location.state` o `navigate` cambia.

  // Si no se ha seleccionado un tipo de habitación, no renderiza nada
  if (!tipoSeleccionado) {
    return null; // Previene el renderizado hasta que el tipoSeleccionado se haya establecido.
  }

  // Filtra las habitaciones que coinciden con el tipo seleccionado.
  const habitacionesFiltradas = habitaciones.filter(h => h.tipo === tipoSeleccionado);

  return (
    <div>
      <Header /> {/* Componente Header con la barra de navegación */}

      <FiltroHabitaciones /> {/* Componente de filtro para mostrar opciones de habitaciones */}

      <div className="habitaciones-filtradas-contenedor"> {/* Contenedor principal para las habitaciones filtradas */}
        <h2 className="habitaciones-title">
          {/* Muestra el número de resultados encontrados, dependiendo del tipo de habitación */}
          {habitacionesFiltradas.length} resultado{habitacionesFiltradas.length !== 1 && 's'} encontrados para: 
          <span style={{ color: '#e76e50' }}>Habitación {tipoSeleccionado}</span>
        </h2>

        <div className="habitaciones-filtradas-grid">
          <div className="habitaciones-lista"> 
            {/* Mapea las habitaciones filtradas y muestra un HabitacionCard para cada una */}
            {habitacionesFiltradas.map((h, index) => (
              <HabitacionCard key={index} {...h} /> // Pasa las propiedades de cada habitación a HabitacionCard
            ))}
          </div>

          <div className="habitaciones-mapa"> {/* Sección para mostrar un mapa con la ubicación */}
            <iframe
              title="Ubicación Hostel Lonchería Novel"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3989.8016510262773!2d-78.4782305!3d-0.1656228!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x91d59b262dd2708f%3A0xbe9b79932fe69685!2sHostel%20loncheria%20Novel!5e0!3m2!1ses-419!2ec!4v1749335046188!5m2!1ses-419!2ec"
              width="100%"
              height="400"
              style={{ border: 0, borderRadius: '12px' }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </div>

      <Footer /> {/* Componente Footer que contiene la información de contacto y otros enlaces */}
    </div>
  );
};

export default HabitacionesFiltradas; // Exporta el componente para ser usado en otras partes de la aplicación.
