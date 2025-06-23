import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ReservasTabsAdmin from '../components/ReservasTabsAdmin';
import ReservaCardAdmin from '../components/ReservaCardAdmin';
import './Reservas.css';

const manejarAtras = () => {
  window.history.back();
};

const ReservacionesAdmin = () => {
  const [reservas, setReservas] = useState([]);
  const [tabActivo, setTabActivo] = useState('confirmada'); // 'confirmada', 'aceptada', 'rechazada'

  const cargarReservas = async () => {
    try {
      const res = await axios.get('http://localhost:3002/reservas');
      setReservas(res.data);
    } catch (error) {
      console.error('Error al cargar reservas:', error);
    }
  };

  useEffect(() => {
    cargarReservas();
  }, []);

  const reservasFiltradas = reservas.filter(r => r.estado === tabActivo);

  return (
    <div>
      <Header />
      <div className="reservas-container">
        <button className="btn-atras" onClick={manejarAtras}>Atrás</button>
        <h2 className="reservas-titulo">Gestión de Reservaciones</h2>

        <ReservasTabsAdmin tabActivo={tabActivo} setTabActivo={setTabActivo} />

        <div className="reservas-lista">
          {reservasFiltradas.length > 0 ? (
            reservasFiltradas.map(reserva => (
              <ReservaCardAdmin
                key={reserva.id}
                reserva={reserva}
                recargarReservas={cargarReservas}
              />
            ))
          ) : (
            <p style={{ marginTop: '2rem', textAlign: 'center' }}>
              No hay reservas en esta categoría.
            </p>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ReservacionesAdmin;
