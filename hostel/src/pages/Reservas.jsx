// src/pages/Reservas.jsx
import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ReservaFormulario from '../components/ReservaFormulario';
import './Reservas.css';

const manejarAtras = () => {
  window.history.back();
};

const Reservas = () => {
  return (
    <div className="page-layout">
      <div className="page-content">
        <Header />

        <div className="reservas-container">
          <button className="btn-atras" onClick={manejarAtras}>Atrás</button>
          <h2 className="reservas-titulo">Formulario de Reservación</h2>

          <ReservaFormulario />
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Reservas;
