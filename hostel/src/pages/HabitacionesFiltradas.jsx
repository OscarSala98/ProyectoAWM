import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import FiltroHabitaciones from '../components/FiltroHabitaciones';

import HabitacionCard from '../components/HabitacionCard';

import imgSimple from '../assets/HS103.webp';
import imgDoble from '../assets/HD103.webp';
import imgDelux from '../assets/HDE302.webp';

const HabitacionesFiltradas = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [tipoSeleccionado, setTipoSeleccionado] = useState(null);

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


  useEffect(() => {
    if (location.state && location.state.tipo) {
      setTipoSeleccionado(location.state.tipo);
    } else {
      navigate('/habitaciones');
    }
  }, [location.state, navigate]);

  if (!tipoSeleccionado) {
    return null; // evita mostrar contenido mientras redirige
  }

  const habitacionesFiltradas = habitaciones.filter(h => h.tipo === tipoSeleccionado);

  return (
     <div>
    <Header />
    <FiltroHabitaciones />

    <div className="habitaciones-filtradas-contenedor">
      <h2 className="habitaciones-title">
        {habitacionesFiltradas.length} resultado{habitacionesFiltradas.length !== 1 && 's'} encontrados para: <span style={{ color: '#e76e50' }}>Habitación {tipoSeleccionado}</span>
      </h2>

      <div className="habitaciones-filtradas-grid">
        <div className="habitaciones-lista">
          {habitacionesFiltradas.map((h, index) => (
            <HabitacionCard key={index} {...h} />
          ))}
        </div>

        <div className="habitaciones-mapa">
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

    <Footer />
  </div>
  );
};

export default HabitacionesFiltradas;
