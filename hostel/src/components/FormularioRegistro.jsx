import React, { useState } from 'react';
import axios from 'axios';
import ModalConfirmacion from './ModalConfirmacion';
import './FormularioRegistro.css';

const FormularioRegistro = ({ onClose }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [mensajeModal, setMensajeModal] = useState('');

  const [persona, setPersona] = useState({
    primerNombre: '',
    segundoNombre: '',
    primerApellido: '',
    numero: '',
    correo: '',
    contrasena: '',
    tipo: 'usuario',
    foto: ''
  });

  const handleChange = (e) => {
    setPersona({ ...persona, [e.target.name]: e.target.value });
  };

  const manejarRegistrar = (e) => {
    e.preventDefault();
    axios.post('http://localhost:3002/personas', persona)
      .then(() => {
        setMensajeModal('Registro exitoso ✅');
        setModalVisible(true);
      })
      .catch((error) => {
        console.error(error);
        setMensajeModal('Error al registrar ❌');
        setModalVisible(true);
      });
  };

  const cerrarModal = () => {
    setModalVisible(false);
    setMensajeModal('');
    setPersona({
      primerNombre: '',
      segundoNombre: '',
      primerApellido: '',
      numero: '',
      correo: '',
      contrasena: '',
      tipo: 'usuario',
      foto: ''
    });
    onClose();
  };

  return (
    <div className="modal">
      <div className="modal-content formulario-registro">
        <button className="cerrar" onClick={onClose}>✕</button>
        <h3>Regístrate</h3>

        <form onSubmit={manejarRegistrar}>
          <div className="entrada-doble">
            <div>
              <label>Primer Nombre</label>
              <input
                type="text"
                name="primerNombre"
                placeholder="Primer Nombre"
                value={persona.primerNombre}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <label>Segundo Nombre</label>
              <input
                type="text"
                name="segundoNombre"
                placeholder="Segundo Nombre"
                value={persona.segundoNombre}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="entrada-doble">
            <div>
              <label>Primer Apellido</label>
              <input
                type="text"
                name="primerApellido"
                placeholder="Primer Apellido"
                value={persona.primerApellido}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <label>Número de teléfono</label>
              <input
                type="text"
                name="numero"
                placeholder="Número de teléfono"
                value={persona.numero}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div>
            <label>Correo Electrónico</label>
            <input
              type="email"
              name="correo"
              placeholder="Correo Electrónico"
              value={persona.correo}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label>Contraseña</label>
            <input
              type="password"
              name="contrasena"
              placeholder="Nueva Contraseña"
              value={persona.contrasena}
              onChange={handleChange}
              required
            />
          </div>

          <button className="btn-continuar" type="submit">Continuar</button>
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
