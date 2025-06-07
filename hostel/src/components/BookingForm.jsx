import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import './BookingForm.css'; // Puedes añadir estilos personalizados

const BookingForm = () => {
  const [checkIn, setCheckIn] = useState(null);
  const [checkOut, setCheckOut] = useState(null);
  const [adultos, setAdultos] = useState(0);
  const [ninos, setNinos] = useState(0);

  const handleSearch = () => {
    console.log('Buscar con:', {
      checkIn,
      checkOut,
      adultos,
      ninos
    });
    // Aquí puedes navegar o filtrar habitaciones
  };

  return (
    <div className="booking-form">
      <h2><strong>Buscar</strong> <span style={{ color: '#e76e50' }}>Habitaciones</span></h2>

      <div className="form-row">
        <div className="form-group">
          <label>Check In</label>
          <DatePicker
            selected={checkIn}
            onChange={(date) => setCheckIn(date)}
            placeholderText="Agregar fecha"
            dateFormat="MM/dd/yyyy"
          />
        </div>

        <div className="form-group">
          <label>Check Out</label>
          <DatePicker
            selected={checkOut}
            onChange={(date) => setCheckOut(date)}
            placeholderText="Agregar fecha"
            dateFormat="MM/dd/yyyy"
          />
        </div>

        <div className="form-group">
          <label>Adultos</label>
          <input
            type="number"
            value={adultos}
            min={0}
            max={10}
            onChange={(e) => setAdultos(Math.min(Number(e.target.value), 10))}
          />
        </div>

        <div className="form-group">
          <label>Niños</label>
          <input
            type="number"
            value={ninos}
            min={0}
            max={10}
            onChange={(e) => setNinos(Math.min(Number(e.target.value), 10))}
          />
        </div>

        <div className="form-group search-btn">
          <button onClick={handleSearch}>🔍</button>
        </div>
      </div>
    </div>
  );
};

export default BookingForm;
// Puedes añadir estilos personalizados en BookingForm.css
// Ejemplo de estilos en BookingForm.css