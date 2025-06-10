import React, { useState } from 'react';
import './Mensajes.css';
import CuadroMensaje from './CuadroMensaje';
import { BsSendFill } from 'react-icons/bs';

const contactosMock = [
  { id: 1, nombre: 'Jean Cardoso', ultimaConexion: '12 Marzo 2025' },
  { id: 2, nombre: 'Sabina Alomoto', ultimaConexion: '25 Junio 2025' },
  { id: 3, nombre: 'Naif Mckiff', ultimaConexion: '25 Junio 2025' },
];

const Mensajes = () => {
  const [contactoActivo, setContactoActivo] = useState(contactosMock[0]);

  return (
    <div className="mensajes-container">
      {/* Panel Izquierdo */}
      <div className="mensajes-sidebar">
        <h3>Todos los Mensaje</h3>
        {contactosMock.map((contacto) => (
          <CuadroMensaje
            key={contacto.id}
            contacto={contacto}
            activo={contactoActivo.id === contacto.id}
            onClick={() => setContactoActivo(contacto)}
          />
        ))}
      </div>

      {/* Panel Derecho */}
      <div className="mensajes-conversacion">
        <div className="mensajes-body">
          <h2>Conversación con {contactoActivo.nombre}</h2>
          <p style={{ color: '#ccc' }}>Aquí van los mensajes...</p>
        </div>

        <div className="mensajes-input">
          <input type="text" placeholder="Type your message..." />
          <button className="btn-enviar">
            <BsSendFill size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Mensajes;
