import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ReservasTabs from '../components/ReservasTabs';
import ReservaCard from '../components/ReservaCard';
import './Reservas.css';

const URLbase = 'http://localhost:3002/api/v1/';

const MisReservas = () => {
  const [tabActivo, setTabActivo] = useState('futura');
  const [reservas, setReservas] = useState([]);
  const [cargando, setCargando] = useState(true);

  const usuario = JSON.parse(localStorage.getItem('usuario'));

  useEffect(() => {
    if (usuario) {
      axios.get(`${URLbase}reservas?usuarioId=${usuario.id}`)
        .then(res => {
          const data = res.data?.reservas;
          if (Array.isArray(data)) {
            setReservas(data);
          } else {
            console.error('La propiedad reservas no es un array:', data);
            setReservas([]);
          }
        })
        .catch(err => {
          console.error('Error cargando reservas:', err);
          setReservas([]);
        })
        .finally(() => setCargando(false));
    } else {
      setReservas([]);
      setCargando(false);
    }
  }, [usuario]);

  const cancelarReserva = async (id) => {
    try {
      await axios.delete(`${URLbase}reservas/${id}`);
      setReservas(prev => prev.filter(r => r.id !== id));
    } catch (error) {
      console.error('Error al cancelar reserva:', error);
    }
  };

  const reservasFiltradas = reservas.filter(r => {
    const esFutura = new Date(r.checkIn) >= new Date();
    return tabActivo === 'futura' ? esFutura : !esFutura;
  });

  const manejarAtras = () => {
    window.history.back();
  };

  return (
    <div>
      <Header />
      <div className="reservas-container">
        <button className="btn-atras" onClick={manejarAtras}>Atrás</button>
        <h2 className="reservas-titulo">Mis Reservas</h2>

        <ReservasTabs tabActivo={tabActivo} setTabActivo={setTabActivo} />

        {cargando ? (
          <p>Cargando reservas...</p>
        ) : reservasFiltradas.length === 0 ? (
          <p className="sin-reservas">No tienes reservas {tabActivo === 'futura' ? 'futuras' : 'pasadas'}.</p>
        ) : (
          <div className="reservas-lista">
            {reservasFiltradas.map(reserva => (
              <ReservaCard
                key={reserva.id}
                reserva={reserva}
                onCancelar={cancelarReserva}
              />
            ))}
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default MisReservas;
