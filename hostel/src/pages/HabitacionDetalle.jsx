import React from 'react';
import { useParams } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import './Habitaciones.css';
import habitaciones from '../data/dataHabitaciones';
import { FaBed, FaShower, FaCar, FaPaw, FaUtensils, FaTv, FaSnowflake, FaWifi, FaBinoculars } from 'react-icons/fa';

const HabitacionDetalle = () => {
  const { id } = useParams();
  const habitacion = habitaciones.find(h => h.id === id);

  if (!habitacion) return <p style={{ textAlign: 'center' }}>Habitación no encontrada</p>;

  const imagenes = [
    require(`../assets/${id}.webp`),
    require(`../assets/${id}_secundario.webp`),
    require(`../assets/${id}_bano.webp`),
    require(`../assets/${id}_sala.webp`),
    require(`../assets/${id}_secundario2.webp`)
  ];

  return (
    <div>
      <Header />
      <div className="detalle-container">
        <div className="detalle-galeria">
          <div className="galeria-principal">
            <img src={imagenes[0]} alt="principal" />
          </div>
          <div className="galeria-miniaturas">
            {imagenes.slice(1).map((img, i) => (
              <img key={i} src={img} alt={`img-${i}`} />
            ))}
          </div>
        </div>

        <div className="detalle-contenido">
          <h2>{habitacion.titulo}</h2>

          <div className="detalle-iconos">
            <div><FaBed /> {habitacion.camas} Cama</div>
            <div><FaShower /> {habitacion.banos} Baño</div>
            <div><FaCar /> {habitacion.parqueo} Auto</div>
            <div><FaPaw /> {habitacion.mascotas} Mascotas</div>
          </div>

          <div className="detalle-precio">
            <h3>{habitacion.precio}</h3>
            <ul>
              <li>Short Period: {habitacion.precioDesglose?.corto}</li>
              <li>Medium Period: {habitacion.precioDesglose?.medio}</li>
              <li>Long Period: {habitacion.precioDesglose?.largo}</li>
            </ul>
            <button className="btn-reservar">Reserve Ahora</button>
          </div>

          <h4>Descripción de la Habitación</h4>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit...</p>

          <h4>Offered Amenities</h4>
          <div className="detalle-amenidades">
            {habitacion.amenities.includes('Alimentación') && <div><FaUtensils /> Alimentación</div>}
            {habitacion.amenities.includes('Smart TV') && <div><FaTv /> Smart TV</div>}
            {habitacion.amenities.includes('Aire Acondicionado') && <div><FaSnowflake /> Aire Acondicionado</div>}
            {habitacion.amenities.includes('Wifi') && <div><FaWifi /> Wifi</div>}
            {habitacion.amenities.includes('Vista al Patio') && <div><FaBinoculars /> Vista al Patio</div>}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default HabitacionDetalle;