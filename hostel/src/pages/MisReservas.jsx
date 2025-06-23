import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ReservasTabs from '../components/ReservasTabs';
import ReservaCard from '../components/ReservaCard';
import './Reservas.css';

const MisReservas = () => {
  const [tabActivo, setTabActivo] = useState('futura');
  const [reservas, setReservas] = useState([]);

  const usuario = JSON.parse(localStorage.getItem('usuario'));

  useEffect(() => {
    if (usuario) {
      axios.get(`http://localhost:3002/reservas?usuarioId=${usuario.id}`)
        .then(res => setReservas(res.data))
        .catch(err => console.error('Error cargando reservas:', err));
    }
  }, [usuario]);

  const cancelarReserva = async (id) => {
    try {
      await axios.delete(`http://localhost:3002/reservas/${id}`);
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

        <div className="reservas-lista">
          {reservasFiltradas.map(reserva => (
            <ReservaCard
              key={reserva.id}
              reserva={reserva}
              onCancelar={cancelarReserva} // ✅ Aquí pasas la función
            />
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default MisReservas;
