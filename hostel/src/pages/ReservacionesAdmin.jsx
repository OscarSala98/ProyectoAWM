import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ReservasTabsAdmin from '../components/ReservasTabsAdmin';
import ReservaCardAdmin from '../components/ReservaCardAdmin';
import './Reservas.css';

const URLbase = 'http://localhost:3002/api/';

const manejarAtras = () => {
  window.history.back();
};

const ReservacionesAdmin = () => {
  const [reservas, setReservas] = useState([]);
  const [tabActivo, setTabActivo] = useState('pendiente'); // 'pendiente', 'confirmada', 'rechazada'
  const [cargando, setCargando] = useState(true);

  const cargarReservas = async () => {
    try {
      setCargando(true);
      const axiosConfig = {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        }
      };

      // Usar la URL que funcionaba antes
      const res = await axios.get(`${URLbase}reservas`, axiosConfig);
      
      // Ajustar según la estructura de respuesta del backend
      const data = res.data;
      if (Array.isArray(data)) {
        setReservas(data);
      } else if (data?.reservas && Array.isArray(data.reservas)) {
        setReservas(data.reservas);
      } else {
        console.error('Respuesta inesperada del servidor:', data);
        setReservas([]);
      }
    } catch (error) {
      console.error('Error al cargar reservas:', error);
      if (error.response?.status === 401) {
        // Token expirado
        localStorage.removeItem('token');
        localStorage.removeItem('usuario');
        window.location.href = '/login';
      }
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => {
    cargarReservas();
  }, []);

  const reservasFiltradas = reservas.filter(r => r.estado === tabActivo);

  return (
    <div className="page-layout">
      <div className="page-content">
        <Header />
        <div className="reservas-container">
          <button className="btn-atras" onClick={manejarAtras}>Atrás</button>
          <h2 className="reservas-titulo">Gestión de Reservaciones</h2>

          <ReservasTabsAdmin tabActivo={tabActivo} setTabActivo={setTabActivo} />

          {cargando ? (
            <p style={{ marginTop: '2rem', textAlign: 'center' }}>Cargando reservas...</p>
          ) : (
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
                  No hay reservas {tabActivo === 'pendiente' ? 'pendientes' : 
                                  tabActivo === 'confirmada' ? 'confirmadas' : 'rechazadas'}.
                </p>
              )}
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ReservacionesAdmin;
