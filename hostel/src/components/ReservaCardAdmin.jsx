import React, { useState } from 'react';
import './ReservaCardAdmin.css';
import ModalConfirmacion from './ModalConfirmacion';
import axios from 'axios';

const URLbase = 'http://localhost:3002/api/';

const ReservaCardAdmin = ({ reserva, recargarReservas }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [mensajeModal, setMensajeModal] = useState('');

  const actualizarEstadoReserva = async (nuevoEstado, mensaje) => {
    try {
      // Usar PUT completo en lugar de PATCH para evitar problemas de CORS
      await axios.put(`${URLbase}reservas/${reserva.id}`, {
        ...reserva, // Enviar todos los datos de la reserva
        estado: nuevoEstado // Solo cambiar el estado
      }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json'
        }
      });

      // Notificar al usuario sobre el cambio de estado
      await axios.post(`${URLbase}notificaciones`, {
        id_usuario: reserva.usuarioId || reserva.id_usuario,
        tipo: "reserva",
        estado: "sin leer",
        titulo: `Reserva ${nuevoEstado === 'confirmada' ? 'aprobada' : 'rechazada'}: ${reserva.tituloHabitacion || 'Habitación'}`
      }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      }).catch(err => console.warn('No se pudo enviar notificación'));

      setMensajeModal(mensaje);
      setModalVisible(true);
      recargarReservas();
    } catch (error) {
      console.error('Error al actualizar reserva:', error);
      setMensajeModal('❌ Error al actualizar la reserva');
      setModalVisible(true);
    }
  };

  const manejarAprobar = () => {
    actualizarEstadoReserva('confirmada', '✅ Reserva Aprobada');
  };

  const manejarRechazar = () => {
    actualizarEstadoReserva('rechazada', '❌ Reserva Rechazada');
  };

  const cerrarModal = () => {
    setModalVisible(false);
    setMensajeModal('');
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
          <p><strong>Check Out:</strong> {reserva.checkOut}</p>
          <p><strong>Por:</strong> {reserva.usuarioNombre}</p>
          <p><strong>Personas:</strong> {reserva.personas || `${reserva.adultos} Adulto(s), ${reserva.ninos} Niño(s)`}</p>
          <p><strong>Precio:</strong> {reserva.precio}</p>
          <p><strong>Estado:</strong> 
            <span className={`estado-${reserva.estado}`}>
              {reserva.estado === 'pendiente' ? '⏳ Pendiente de aprobación' : 
               reserva.estado === 'confirmada' ? '✅ Confirmada' : 
               reserva.estado === 'rechazada' ? '❌ Rechazada' : reserva.estado}
            </span>
          </p>
        </div>

        {/* Solo mostrar botones si la reserva está pendiente */}
        {reserva.estado === 'pendiente' && (
          <div className="reserva-acciones">
            <button className="btn-aprobar" onClick={manejarAprobar}>Aprobar</button>
            <button className="btn-rechazar" onClick={manejarRechazar}>Rechazar</button>
          </div>
        )}

        {/* Mostrar mensaje para reservas confirmadas o rechazadas */}
        {reserva.estado === 'confirmada' && (
          <div className="reserva-estado-info">
            <p className="estado-mensaje confirmada">✅ Reserva aprobada</p>
          </div>
        )}

        {reserva.estado === 'rechazada' && (
          <div className="reserva-estado-info">
            <p className="estado-mensaje rechazada">❌ Reserva rechazada</p>
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
