import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ReservasTabs from '../components/ReservasTabs';
import ReservaCard from '../components/ReservaCard';
import axios from 'axios';
import './Reservas.css';

const manejarAtras = () => {
  window.history.back();
};

const MisReservas = () => {
  const [tabActivo, setTabActivo] = useState('futura');
  const [reservas, setReservas] = useState([]);
  const [usuario, setUsuario] = useState(null);

  useEffect(() => {
    const usuarioLocal = JSON.parse(localStorage.getItem('usuario'));
    setUsuario(usuarioLocal);

    if (!usuarioLocal) return;

    axios.get('http://localhost:3002/reservas', {
      params: { usuarioId: usuarioLocal.id }
    })
    .then(res => setReservas(res.data))
    .catch(err => console.error('Error al cargar reservas:', err));
  }, []);

  // Clasifica reservas pasadas y futuras
  const ahora = new Date();
  const reservasFiltradas = reservas.filter((r) => {
    const checkIn = new Date(r.checkIn);
    if (tabActivo === 'futura') return checkIn >= ahora;
    else return checkIn < ahora;
  });

  return (
    <div>
      <Header />
      <div className="reservas-container">
        <button className="btn-atras" onClick={manejarAtras}>Atrás</button>
        <h2 className="reservas-titulo">Mis Reservas</h2>

        <ReservasTabs tabActivo={tabActivo} setTabActivo={setTabActivo} />

        <div className="reservas-lista">
          {reservasFiltradas.length > 0 ? (
            reservasFiltradas.map(reserva => (
              <ReservaCard key={reserva.id} reserva={reserva} />
            ))
          ) : (
            <p style={{ textAlign: 'center' }}>No hay reservas {tabActivo === 'futura' ? 'futuras' : 'pasadas'}.</p>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default MisReservas;
