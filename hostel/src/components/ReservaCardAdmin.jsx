import React, { useState } from 'react';
import './ReservaCardAdmin.css';
import ModalConfirmacion from './ModalConfirmacion';

const ReservaCardAdmin = ({ reserva }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [mensajeModal, setMensajeModal] = useState('');

  const manejarAprobar = () => {
    setMensajeModal('Reserva Aprobada ✅');
    setModalVisible(true);
  };

  const manejarRechazar = () => {
    setMensajeModal('Reserva Rechazada ❌');
    setModalVisible(true);
  };

  const cerrarModal = () => {
    setModalVisible(false);
    setMensajeModal('');
  };

  return (
    <>
      <div className="reserva-admin-card">
        <img src={reserva.imagen} alt={reserva.habitacion} className="reserva-admin-img" />

        <div className="reserva-admin-detalles">
          <h4>{reserva.habitacion}</h4>
          <p><strong>Check In:</strong> {reserva.checkIn}</p>
          <p><strong>Por:</strong> {reserva.usuario}</p>
        </div>

        <div className="reserva-admin-extra">
          <p><strong>Duration:</strong> {reserva.duracion}</p>
          <p><strong>Guests:</strong> {reserva.personas}</p>
        </div>

        {/* Mostrar botones solo si la reserva NO está rechazada */}
        {reserva.tipo !== 'rechazada' && reserva.tipo !== 'pasada' && (
          <div className="reserva-admin-acciones">
            <button className="btn-aprobar" onClick={manejarAprobar}>Aprobar</button>
            <button className="btn-rechazar" onClick={manejarRechazar}>Rechazar</button>
          </div>
)}

      </div>

      <ModalConfirmacion
        visible={modalVisible}
        mensaje={mensajeModal}
        onClose={cerrarModal}
      />
    </>
  );
};

export default ReservaCardAdmin;
