import React from 'react';
import './MapaHabitaciones.css';

const MapaHabitaciones = () => (
  <div className="habitaciones-mapa">
    <iframe
      title="Ubicación Hostel Lonchería Novel"
      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3989.8016510262773!2d-78.4782305!3d-0.1656228!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x91d59b262dd2708f%3A0xbe9b79932fe69685!2sHostel%20loncheria%20Novel!5e0!3m2!1ses-419!2sec!4v1749335046188!5m2!1ses-419!2sec"
      width="100%"
      height="400"
      style={{ border: 0, borderRadius: '12px' }}
      allowFullScreen=""
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"
    />
  </div>
);

export default MapaHabitaciones;
