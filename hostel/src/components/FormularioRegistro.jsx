import React from 'react';
import { useState } from 'react';
import ModalConfirmacion from './ModalConfirmacion';
import './FormularioRegistro.css';

const FormularioRegistro = ({ onClose }) => {

  const [modalVisible, setModalVisible] = useState(false);
    const [mensajeModal, setMensajeModal] = useState('');
  
    const manejarRegistrar = () => {
    setMensajeModal('Registro exitoso ✅');
    setModalVisible(true);
  };

  const cerrarModal = () => {
    setModalVisible(false);
    setMensajeModal('');
  };
  return (
    <div className="modal">
      <div className="modal-content formulario-registro">
        <button className="cerrar" onClick={onClose}>✕</button>
        <h3>Regístrate</h3>

        <form>
          <div className="entrada-doble">
            <select>
              <option>ECU (+593)</option>
              <option>PER (+51)</option>
              <option>COL (+57)</option>
            </select>
            <input type="text" placeholder="Ingrese su número" />
          </div>

          <input type="email" placeholder="Ingrese su correo" />
          <input type="text" placeholder="Ingrese su nombre" />
          <input type="password" placeholder="Ingrese su contraseña" />

          <button className="btn-continuar" onClick={manejarRegistrar} >Continuar</button>
          
        </form>
      </div>
      <ModalConfirmacion
        visible={modalVisible}
        mensaje={mensajeModal}
        onClose={cerrarModal}
      />
    </div>
  );
};

export default FormularioRegistro;
