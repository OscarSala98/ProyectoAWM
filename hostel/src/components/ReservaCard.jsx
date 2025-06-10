// src/components/ReservaCard.jsx
import React, { useState } from 'react';
import './ReservaCard.css';
import ModalConfirmacion from './ModalConfirmacion'; // asegúrate de tener este componente creado

const ReservaCard = ({ reserva }) => {
  const [mostrarModal, setMostrarModal] = useState(false);

  const manejarCancelacion = () => {
    setMostrarModal(true);
  };

  const cerrarModal = () => {
    setMostrarModal(false);
  };

  return (
    <>
      <div className="reserva-card">
        <img src={reserva.imagen} alt={reserva.habitacion} className="reserva-img" />

        <div className="reserva-info">
          <h4>{reserva.habitacion}</h4>
          <p><strong>Check In:</strong> {reserva.checkIn}</p>
          <p><strong>Duración:</strong> {reserva.duracion}</p>
          <p><strong>Personas:</strong> {reserva.personas}</p>
          <p className="reserva-precio">{reserva.precio}</p>
        </div>

        <button className="btn-cancelar" onClick={manejarCancelacion}>
          Cancelar Reservación
        </button>
      </div>

      <ModalConfirmacion visible={mostrarModal} onClose={cerrarModal} />
    </>
  );
};

export default ReservaCard;
