import React, { useState } from 'react';
import './ReservaCardAdmin.css';
import ModalConfirmacion from './ModalConfirmacion';
import axios from 'axios';

const ReservaCardAdmin = ({ reserva, recargarReservas }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [mensajeModal, setMensajeModal] = useState('');

  const actualizarEstadoReserva = async (nuevoEstado, mensaje) => {
    try {
      await axios.patch(`http://localhost:3002/reservas/${reserva.id}`, {
        estado: nuevoEstado
      });

      await axios.post('http://localhost:3002/notificaciones', {
        id: Date.now().toString(),
        texto: `Reserva ${nuevoEstado}: ${reserva.tituloHabitacion}`,
        fecha: new Date().toISOString().split('T')[0]
      });

      setMensajeModal(mensaje);
      setModalVisible(true);
      recargarReservas();
    } catch (error) {
      console.error('Error al actualizar reserva:', error);
    }
  };

  const manejarAprobar = () => {
    actualizarEstadoReserva('aceptada', '✅ Reserva Aprobada');
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
    return 'No especificado';
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
        </div>

        {reserva.estado === 'confirmada' && (
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

// Calcula duración en días
const calcularDuracion = (entrada, salida) => {
  const inDate = new Date(entrada);
  const outDate = new Date(salida);
  const dias = Math.ceil((outDate - inDate) / (1000 * 60 * 60 * 24));
  return `${dias} ${dias === 1 ? 'día' : 'días'}`;
};

export default ReservaCardAdmin;
