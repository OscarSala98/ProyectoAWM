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
    prefijo: '+593', // 👈 importante para que funcione
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

    // Combinar prefijo y número antes de enviar
    const datosAEnviar = {
      ...persona,
      numero: persona.prefijo + persona.numero // Sobrescribe el campo 'numero' con el prefijo incluido
    };

    axios.post('http://localhost:3002/personas', datosAEnviar)
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
      prefijo: '+593', // 👈 necesario para no romper el select
      correo: '',
      contrasena: '',
      tipo: 'usuario',
      foto: ''
    });
    onClose();
  };

  return (
    <div className="modal-overlay">
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
                pattern="^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$"
                title="Solo letras"
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
                pattern="^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$"
                title="Solo letras"
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
                pattern="^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$"
                title="Solo letras"
                required
              />
            </div>

            <div>
              <label>Teléfono</label>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <select
                  name="prefijo"
                  value={persona.prefijo}
                  onChange={handleChange}
                  required
                >
                  <option value="+593">+593</option>
                  <option value="+7">+7</option>
                  <option value="+21">+21</option>
                </select>
                <input
                  type="text"
                  name="numero"
                  placeholder="1234567890"
                  value={persona.numero}
                  onChange={(e) => {
                    const soloNumeros = e.target.value.replace(/\D/g, '');
                    if (soloNumeros.length <= 10) {
                      setPersona({ ...persona, numero: soloNumeros });
                    }
                  }}
                  pattern="\d{7,10}"
                  title="Debe tener entre 7 y 10 dígitos"
                  required
                />
              </div>
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
              pattern="^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$"
              title="Formato de correo inválido"
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
              pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&.,;:_\-])[A-Za-z\d@$!%*?&.,;:_\-]{8,}$"
              title="Debe tener al menos 8 caracteres, una mayúscula, una minúscula, un número y un símbolo especial"
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
