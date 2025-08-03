import React, { useState } from 'react';
import './ReservaCardAdmin.css';
import ModalConfirmacion from './ModalConfirmacion';
import axios from 'axios';

const URLbase = 'http://localhost:3002/api/';

const ReservaCardAdminFixed = ({ reserva, recargarReservas }) => {
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

  const renderPersonas = () => {
    if (typeof reserva.personas === 'string') {
      return reserva.personas;
    }
    if (typeof reserva.personas === 'object' && reserva.personas !== null) {
      return `${reserva.personas.adultos} Adulto(s), ${reserva.personas.ninos} Niño(s)`;
    }
    // Fallback usando adultos y ninos directamente
    if (reserva.adultos !== undefined && reserva.ninos !== undefined) {
      return `${reserva.adultos} Adulto(s), ${reserva.ninos} Niño(s)`;
    }
    return 'No especificado';
  };

  const calcularDuracion = (entrada, salida) => {
    const inDate = new Date(entrada);
    const outDate = new Date(salida);
    const dias = Math.ceil((outDate - inDate) / (1000 * 60 * 60 * 24));
    return `${dias} ${dias === 1 ? 'día' : 'días'}`;
  };

  return (
    <>
      <div className="reserva-admin-card">
        <img src={reserva.imagen} alt={reserva.tituloHabitacion} className="reserva-admin-img" />

        <div className="reserva-admin-detalles">
          <h4>{reserva.tituloHabitacion}</h4>
          <p><strong>Check In:</strong> {reserva.checkIn}</p>
          <p><strong>Por:</strong> {reserva.usuarioNombre}</p>
        </div>

        <div className="reserva-admin-extra">
          <p><strong>Duración:</strong> {calcularDuracion(reserva.checkIn, reserva.checkOut)}</p>
          <p><strong>Personas:</strong> {renderPersonas()}</p>
          <p><strong>Precio:</strong> {reserva.precio}</p>
          <p><strong>Estado:</strong> 
            <span className={`estado-${reserva.estado}`}>
              {reserva.estado === 'pendiente' ? '⏳ Pendiente' : 
               reserva.estado === 'confirmada' ? '✅ Confirmada' : 
               reserva.estado === 'rechazada' ? '❌ Rechazada' : reserva.estado}
            </span>
          </p>
        </div>

        {/* Solo mostrar botones si la reserva está pendiente */}
        {reserva.estado === 'pendiente' && (
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

export default ReservaCardAdminFixed;
