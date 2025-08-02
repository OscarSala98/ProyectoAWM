import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './Mensajes.css';
import { BsSendFill } from 'react-icons/bs';
import { FaEllipsisV } from 'react-icons/fa';

const URLbase = 'http://localhost:3002/api/';
const token = localStorage.getItem("token");

const axiosConfig = {
  headers: {
    Authorization: `Bearer ${token}`
  }
};

const Mensajes = () => {
  const { id } = useParams();
  const [usuarios, setUsuarios] = useState([]);
  const [contactos, setContactos] = useState([]);
  const [contactoActivo, setContactoActivo] = useState(null);
  const [conversacion, setConversacion] = useState(null);
  const [conversaciones, setConversaciones] = useState([]);
  const [nuevoMensaje, setNuevoMensaje] = useState('');
  const [menuAbierto, setMenuAbierto] = useState(null);
  const [mensajeEditando, setMensajeEditando] = useState(null);
  const [textoEditado, setTextoEditado] = useState('');
  const [tipoUsuario, setTipoUsuario] = useState('');
  const [mostrarListaUsuarios, setMostrarListaUsuarios] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const usuariosRes = await axios.get(`${URLbase}personas`, axiosConfig);
        const conversacionesRes = await axios.get(`${URLbase}conversaciones`, axiosConfig);

        const todos = usuariosRes.data;
        const convs = conversacionesRes.data;
        setUsuarios(todos);
        setConversaciones(convs);
        const yo = todos.find(u => u.id === id);
        setTipoUsuario(yo?.tipo?.toLowerCase());

        if (yo?.tipo?.toLowerCase() === 'admin') {
          const participantesUnicos = convs
            .filter(c => c.participantes.includes(id))
            .map(c => c.participantes.find(pid => pid !== id));
          const usuariosFiltrados = todos.filter(u => participantesUnicos.includes(u.id));
          setContactos(usuariosFiltrados);
        } else {
          const admin = todos.find(u => u.tipo?.toLowerCase() === 'admin');
          if (convs.some(c => c.participantes.includes(id) && c.participantes.includes(admin?.id))) {
            setContactos([admin]);
          }
        }
      } catch (error) {
        console.error('Error al obtener datos:', error);
      }
    };
    fetchData();
  }, [id]);

  useEffect(() => {
    if (!contactoActivo) return;
    const conv = conversaciones.find(c =>
      c.participantes.includes(id) && c.participantes.includes(contactoActivo.id)
    );
    setConversacion(conv || null);
  }, [contactoActivo, id, conversaciones]);

  const obtenerNombreUsuario = (userId) => {
    const user = usuarios.find(u => u.id === userId);
    return user ? `${user.primerNombre} ${user.primerApellido}` : 'Usuario';
  };

  const iniciarConversacionCon = async (otroUsuario) => {
    const existente = conversaciones.find(c =>
      c.participantes.includes(id) && c.participantes.includes(otroUsuario.id)
    );

    if (existente) {
      setContactoActivo(otroUsuario);
      setConversacion(existente);
    } else {
      const nueva = {
        participantes: [id, otroUsuario.id]
      };
      const creada = await axios.post(`${URLbase}conversaciones`, nueva, axiosConfig);
      setConversacion(creada.data);
      setContactoActivo(otroUsuario);
      setConversaciones([...conversaciones, creada.data]);
      if (!contactos.find(c => c.id === otroUsuario.id)) {
        setContactos([...contactos, otroUsuario]);
      }
    }
  };

  const handleEnviarMensaje = async () => {
    if (!nuevoMensaje.trim() || !conversacion) return;

    try {
      const respuesta = await axios.post(
        `${URLbase}conversaciones/${conversacion.id}/mensajes`,
        {
          emisor: id,
          texto: nuevoMensaje
        },
        axiosConfig
      );

      const mensajeNuevo = respuesta.data.mensajeEnviado;
      setConversacion(prev => ({
        ...prev,
        mensajes: [...prev.mensajes, mensajeNuevo]
      }));
      setNuevoMensaje('');
    } catch (error) {
      console.error('Error al enviar mensaje:', error);
    }
  };

  const handleEliminarMensaje = async (idMensaje) => {
    try {
      await axios.delete(`${URLbase}conversaciones/${conversacion.id}/mensajes/${idMensaje}`, axiosConfig);
      setConversacion(prev => ({
        ...prev,
        mensajes: prev.mensajes.filter(m => m.id !== idMensaje)
      }));
    } catch (error) {
      console.error('Error al eliminar mensaje:', error);
    }
  };

  const handleEditarMensaje = async (idMensaje) => {
    try {
      const respuesta = await axios.put(
        `${URLbase}conversaciones/${conversacion.id}/mensajes/${idMensaje}`,
        { texto: textoEditado },
        axiosConfig
      );

      const actualizado = respuesta.data.mensaje;

      setConversacion(prev => ({
        ...prev,
        mensajes: prev.mensajes.map(m =>
          m.id === actualizado.id ? actualizado : m
        )
      }));

      setMensajeEditando(null);
      setTextoEditado('');
    } catch (error) {
      console.error('Error al editar mensaje:', error);
    }
  };

  const handleEliminarConversacion = async () => {
    if (!conversacion) return;
    if (!window.confirm("¿Estás seguro de eliminar esta conversación?")) return;

    await axios.delete(`${URLbase}conversaciones/${conversacion.id}`, axiosConfig);
    setConversacion(null);
    setContactoActivo(null);

    const convRes = await axios.get(`${URLbase}conversaciones`, axiosConfig);
    const conversacionesRestantes = convRes.data.filter(c => c.participantes.includes(id));
    const idsConConversacion = conversacionesRestantes.map(c =>
      c.participantes.find(pid => pid !== id)
    );
    const nuevosContactos = usuarios.filter(u => idsConConversacion.includes(u.id));
    setContactos(nuevosContactos);

    window.location.reload();
  };

  return (
    <div className="mensajes-container">
      <div className="mensajes-sidebar">
        <h3>Todos los Mensajes</h3>

        {tipoUsuario === 'admin' ? (
          <>
            <button className="btn-admin" onClick={() => setMostrarListaUsuarios(!mostrarListaUsuarios)}>
              Iniciar conversación
            </button>
            {mostrarListaUsuarios && (
              <select onChange={e => {
                const user = usuarios.find(u => u.id === e.target.value);
                if (user) iniciarConversacionCon(user);
                setMostrarListaUsuarios(false);
              }}>
                <option value="">Selecciona un usuario</option>
                {usuarios.filter(u => u.id !== id).map(c => (
                  <option key={c.id} value={c.id}>{c.primerNombre} {c.primerApellido}</option>
                ))}
              </select>
            )}
          </>
        ) : (
          <button className="btn-admin" onClick={() => {
            const admin = usuarios.find(u => u.tipo?.toLowerCase() === 'admin');
            if (admin) iniciarConversacionCon(admin);
            else alert("No se encontró un administrador.");
          }}>
            Conversar con Admin
          </button>
        )}

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

      <div className="mensajes-conversacion">
        <div className="mensajes-body">
          <div className="encabezado-conversacion">
            <h2>Conversación con {obtenerNombreUsuario(contactoActivo?.id)}</h2>
            <button className="btn-eliminar-conversacion" onClick={handleEliminarConversacion}>Eliminar conversación</button>
          </div>

          <ul>
            {conversacion?.mensajes.map(msg => {
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
                      <input value={textoEditado} onChange={e => setTextoEditado(e.target.value)} />
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
          <button className="btn-enviar" onClick={handleEnviarMensaje}><BsSendFill /></button>
        </div>
      </div>
    </div>
  );
};

export default Mensajes;
