// src/components/HabitacionDescripcion.jsx
import React from 'react';
import './HabitacionDescripcion.css';
import {
  FaUtensils,
  FaTv,
  FaSnowflake,
  FaWifi,
  FaBinoculars
} from 'react-icons/fa';
import './HabitacionDescripcion.css';

const HabitacionDescripcion = ({ habitacion }) => {
  return (
    <div className="habitacion-descripcion">
      <h4>Descripción de la Habitación</h4>
      <p>{habitacion.descripcionLarga}</p>

      <h4>Offered Amenities</h4>
      <div className="habitacion-amenities">
        {habitacion.amenities.includes('Alimentación') && <div><FaUtensils /> Alimentación</div>}
        {habitacion.amenities.includes('Smart TV') && <div><FaTv /> Smart TV</div>}
        {habitacion.amenities.includes('Aire Acondicionado') && <div><FaSnowflake /> Aire Acondicionado</div>}
        {habitacion.amenities.includes('Wifi') && <div><FaWifi /> Wifi</div>}
        {habitacion.amenities.includes('Vista al Patio') && <div><FaBinoculars /> Vista al Patio</div>}
      </div>
    </div>
  );
};

export default HabitacionDescripcion;
