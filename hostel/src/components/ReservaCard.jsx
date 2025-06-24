import React, { useState } from 'react';
import './ReservaCard.css';
import ModalConfirmacionSiNo from './ModalConfirmacionSiNo'; // Cambiado el import
import { useNavigate } from 'react-router-dom';

const ReservaCard = ({ reserva, onCancelar }) => {
  const [mostrarModal, setMostrarModal] = useState(false);
  const navigate = useNavigate();

  const esFutura = new Date(reserva.checkIn) >= new Date();

  const manejarCancelacion = () => {
    setMostrarModal(true);
  };

  const confirmarCancelacion = () => {
    if (typeof onCancelar === 'function') {
      onCancelar(reserva.id);
    }
    setMostrarModal(false);
  };

  const cerrarModal = () => {
    setMostrarModal(false);
  };

  const manejarEditar = () => {
    navigate('/reservas', { state: { reserva } });
  };

  return (
    <>
      <div className="reserva-card">
        <img
          src={reserva.imagen}
          alt={reserva.tituloHabitacion}
          className="reserva-img"
        />

        <div className="reserva-info">
          <h4>{reserva.tituloHabitacion}</h4>
          <p><strong>Check In:</strong> {reserva.checkIn}</p>
          <p><strong>Personas:</strong> {reserva.personas}</p>
          <p><strong>Precio:</strong> {reserva.precio}</p>
        </div>

        {esFutura && (
          <div className="reserva-acciones">
            <button className="btn-editar" onClick={manejarEditar}>
              Editar
            </button>
            <button className="btn-cancelar" onClick={manejarCancelacion}>
              Cancelar Reservación
            </button>
          </div>
        )}
      </div>

      {/* Modal de Confirmación Sí/No */}
      <ModalConfirmacionSiNo
        visible={mostrarModal}
        mensaje="¿Estás seguro de que deseas cancelar esta reserva?"
        onConfirmar={confirmarCancelacion}
        onCancelar={cerrarModal}
      />
    </>
  );
};

export default ReservaCard;
