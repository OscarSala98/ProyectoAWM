import React, { useState } from 'react';
import './HabitacionEditarCard.css';
import ModalConfirmacion from './ModalConfirmacion';

const HabitacionEditarCard = ({ habitacion, onEditar, onEliminar }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [mensajeModal, setMensajeModal] = useState('');

  const manejarEliminar = () => {
    setMensajeModal('Habitación eliminada 🗑️');
    setModalVisible(true);
    onEliminar && onEliminar(habitacion.id); // callback al padre si se proporciona
  };

  const manejarEditar = () => {
    if (onEditar) {
    onEditar(habitacion.id);
    }
  };

  const cerrarModal = () => {
    setModalVisible(false);
    setMensajeModal('');
  };

  return (
    <>
      <div className="habitacion-editar-card">
        <img
          src={habitacion.portada}
          alt={habitacion.titulo}
          className="habitacion-editar-img"
        />

        <div className="habitacion-editar-detalles">
          <h4>{habitacion.titulo}</h4>
          <p><strong>Tipo:</strong> {habitacion.tipo}</p>
          <p><strong>Precio:</strong> {habitacion.precio}</p>
        </div>

        <div className="habitacion-editar-acciones">
          <button className="btn-editar" onClick={manejarEditar}>Editar</button>
          <button className="btn-eliminar" onClick={manejarEliminar}>Eliminar</button>
        </div>
      </div>

      <ModalConfirmacion
        visible={modalVisible}
        mensaje={mensajeModal}
        onClose={cerrarModal}
      />
    </>
  );
};

export default HabitacionEditarCard;
