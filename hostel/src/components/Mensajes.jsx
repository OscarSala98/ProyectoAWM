import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './Mensajes.css';
import { BsSendFill } from 'react-icons/bs';
import { FaEllipsisV } from 'react-icons/fa';

const Mensajes = () => {
  const { id } = useParams();
  const [usuarios, setUsuarios] = useState([]);
  const [contactos, setContactos] = useState([]);
  const [contactoActivo, setContactoActivo] = useState(null);
  const [conversacion, setConversacion] = useState(null);
  const [nuevoMensaje, setNuevoMensaje] = useState('');
  const [menuAbierto, setMenuAbierto] = useState(null);
  const [mensajeEditando, setMensajeEditando] = useState(null);
  const [textoEditado, setTextoEditado] = useState('');

  // Obtener datos de usuarios
  useEffect(() => {
    axios.get('http://localhost:3002/personas').then(res => {
      setUsuarios(res.data);
      const otros = res.data.filter(u => u.id !== id);
      setContactos(otros);
      if (otros.length > 0) setContactoActivo(otros[0]);
    });
  }, [id]);

  // Cargar conversación
  useEffect(() => {
    if (!contactoActivo) return;
    axios.get('http://localhost:3002/conversaciones').then(res => {
      const conv = res.data.find(c =>
        c.participantes.includes(id) && c.participantes.includes(contactoActivo.id)
      );
      setConversacion(conv || null);
    });
  }, [contactoActivo, id]);

  const obtenerNombreUsuario = (userId) => {
    const user = usuarios.find(u => u.id === userId);
    return user ? `${user.primerNombre} ${user.primerApellido}` : 'Usuario';
  };

  const handleEnviarMensaje = async () => {
    if (!nuevoMensaje.trim()) return;

    const nuevo = {
      id: Date.now(),
      emisor: id,
      fecha: new Date().toISOString(),
      texto: nuevoMensaje
    };

    if (conversacion) {
      const actualizada = {
        ...conversacion,
        mensajes: [...conversacion.mensajes, nuevo]
      };
      await axios.put(`http://localhost:3002/conversaciones/${conversacion.id}`, actualizada);
      setConversacion(actualizada);
    } else {
      const nueva = {
        id: `conv-${Date.now()}`,
        participantes: [id, contactoActivo.id],
        mensajes: [nuevo]
      };
      await axios.post('http://localhost:3002/conversaciones', nueva);
      setConversacion(nueva);
    }

    setNuevoMensaje('');
  };

  const handleEliminarMensaje = async (idMensaje) => {
    const mensajesFiltrados = conversacion.mensajes.filter(m => m.id !== idMensaje);
    const actualizada = { ...conversacion, mensajes: mensajesFiltrados };
    await axios.put(`http://localhost:3002/conversaciones/${conversacion.id}`, actualizada);
    setConversacion(actualizada);
  };

  const handleEditarMensaje = async (idMensaje) => {
    const mensajesActualizados = conversacion.mensajes.map(m =>
      m.id === idMensaje ? { ...m, texto: textoEditado } : m
    );
    const actualizada = { ...conversacion, mensajes: mensajesActualizados };
    await axios.put(`http://localhost:3002/conversaciones/${conversacion.id}`, actualizada);
    setConversacion(actualizada);
    setMensajeEditando(null);
    setTextoEditado('');
  };

  return (
    <div className="mensajes-container">
      {/* Izquierda: Lista de contactos */}
      <div className="mensajes-sidebar">
        <h3>Todos los Mensajes</h3>
        {contactos.map(contacto => (
          <div
            key={contacto.id}
            className={`contacto-activo ${contactoActivo?.id === contacto.id ? 'activo' : ''}`}
            onClick={() => setContactoActivo(contacto)}
          >
            <div className="avatar-placeholder">
              {contacto.primerNombre[0]}{contacto.primerApellido[0]}
            </div>
            <div className="contacto-info">
              <strong>{contacto.primerNombre} {contacto.primerApellido}</strong>
              <p>Última conexión el sin registro</p>
            </div>
          </div>
        ))}
      </div>

      {/* Derecha: Conversación */}
      <div className="mensajes-conversacion">
        <div className="mensajes-body">
          <h2>Conversación con {obtenerNombreUsuario(contactoActivo?.id)}</h2>
          <ul>
            {conversacion?.mensajes.map((msg) => {
              const esPropio = msg.emisor === id;
              return (
                <li key={msg.id} className={`mensaje-item ${esPropio ? 'mensaje-emisor' : 'mensaje-receptor'}`}>
                  <div className="mensaje-header">
                    <strong>{obtenerNombreUsuario(msg.emisor)}</strong>
                    {esPropio && (
                      <div className="menu-opciones">
                        <span onClick={() => setMenuAbierto(menuAbierto === msg.id ? null : msg.id)}>
                          <FaEllipsisV />
                        </span>
                        {menuAbierto === msg.id && (
                          <div className="menu-dropdown">
                            <button onClick={() => {
                              setMensajeEditando(msg.id);
                              setTextoEditado(msg.texto);
                              setMenuAbierto(null);
                            }}>Editar</button>
                            <button onClick={() => handleEliminarMensaje(msg.id)}>Eliminar</button>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                  {mensajeEditando === msg.id ? (
                    <div className="edicion-input">
                      <input
                        type="text"
                        value={textoEditado}
                        onChange={(e) => setTextoEditado(e.target.value)}
                      />
                      <button onClick={() => handleEditarMensaje(msg.id)}>Guardar</button>
                    </div>
                  ) : (
                    <>
                      <p>{msg.texto}</p>
                      <small>{new Date(msg.fecha).toLocaleString()}</small>
                    </>
                  )}
                </li>
              );
            })}
          </ul>
        </div>

        <div className="mensajes-input">
          <input
            type="text"
            value={nuevoMensaje}
            onChange={(e) => setNuevoMensaje(e.target.value)}
            placeholder="Escribe tu mensaje..."
          />
          <button className="btn-enviar" onClick={handleEnviarMensaje}>
            <BsSendFill />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Mensajes;
