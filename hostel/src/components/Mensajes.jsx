import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './Mensajes.css';
import { BsSendFill } from 'react-icons/bs';
import { FaEllipsisV } from 'react-icons/fa';

const URLbase = 'http://localhost:3002/api/';

const Mensajes = () => {
 // const { id } = useParams();
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

  // Obtener usuario actual del JWT
  const usuarioActual = JSON.parse(localStorage.getItem('usuario'));
  
  // Función para obtener configuración de axios con token fresco
  const getAxiosConfig = () => {
    const token = localStorage.getItem('token');
    return {
      headers: {
        Authorization: `Bearer ${token}`
      }
    };
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const axiosConfig = getAxiosConfig();
        const usuariosRes = await axios.get(`${URLbase}personas`, axiosConfig);
        const conversacionesRes = await axios.get(`${URLbase}conversaciones`, axiosConfig);

        const todos = usuariosRes.data;
        const convs = conversacionesRes.data;
        
        console.log('Conversaciones recibidas del servidor:', convs);
        console.log('Estructura de primera conversación (si existe):', convs[0]);
        console.log('Usuarios recibidos:', todos);
        
        setUsuarios(todos);
        setConversaciones(convs);
        
        // Usar el usuario actual del JWT
        const yo = usuarioActual;
        setTipoUsuario(yo?.tipo?.toLowerCase());

        if (yo?.tipo?.toLowerCase() === 'admin') {
          // Para admin: mostrar usuarios con quienes tiene conversación
          const participantesUnicos = convs
            .filter(c => c.participantes && c.participantes.includes(parseInt(yo.id)))
            .map(c => c.participantes.find(pid => pid !== parseInt(yo.id)));
          const usuariosFiltrados = todos.filter(u => participantesUnicos.includes(u.id));
          setContactos(usuariosFiltrados);
        } else {
          // Para usuario: mostrar admin si existe conversación, o permitir iniciar conversación
          const admin = todos.find(u => u.tipo?.toLowerCase() === 'admin');
          if (admin) {
            const tieneConversacionConAdmin = convs.some(c => 
              c.participantes && 
              c.participantes.includes(parseInt(yo.id)) && 
              c.participantes.includes(admin.id)
            );
            
            if (tieneConversacionConAdmin) {
              setContactos([admin]);
            } else {
              // Permitir iniciar conversación con admin aunque no exista aún
              setContactos([]);
            }
          }
        }
      } catch (error) {
        console.error('Error al obtener datos:', error);
      }
    };
    
    // Solo ejecutar si tenemos usuario actual
    if (usuarioActual) {
      fetchData();
    }
  }, []); // Dependencias vacías para ejecutar solo una vez

  useEffect(() => {
    if (!contactoActivo || !usuarioActual) return;
    
    // Buscar conversación existente
    const conv = conversaciones.find(c =>
      c.participantes && 
      c.participantes.includes(parseInt(usuarioActual.id)) && 
      c.participantes.includes(contactoActivo.id)
    );
    
    if (conv) {
      // Si existe conversación, cargarla
      setConversacion(conv);
    } else {
      // Si no existe, crear una nueva conversación pero SOLO si no estamos ya en proceso
      if (!conversacion || conversacion.participantes?.every(p => ![parseInt(usuarioActual.id), contactoActivo.id].includes(p))) {
        iniciarConversacionCon(contactoActivo);
      }
    }
  }, [contactoActivo]); // Removido conversaciones de las dependencias para evitar loops

  const obtenerNombreUsuario = (userId) => {
    const user = usuarios.find(u => u.id === userId);
    return user ? `${user.primerNombre} ${user.primerApellido}` : 'Usuario';
  };

  const iniciarConversacionCon = async (otroUsuario) => {
    console.log('Buscando conversación existente entre:', usuarioActual.id, 'y', otroUsuario.id);
    console.log('Conversaciones disponibles:', conversaciones);
    
    // Verificar si ya existe una conversación - necesitamos adaptar esto a la estructura real del backend
    const existente = conversaciones.find(c => {
      console.log('Verificando conversación:', c);
      
      // El backend podría devolver participantes de diferentes formas
      let participantes = [];
      
      // Caso 1: participantes como array directo
      if (Array.isArray(c.participantes)) {
        participantes = c.participantes;
      }
      // Caso 2: participantes como objetos con relaciones de Sequelize
      else if (c.personas && Array.isArray(c.personas)) {
        participantes = c.personas.map(p => p.id);
      }
      // Caso 3: participantes en una propiedad anidada
      else if (c.participantes && c.participantes.length) {
        participantes = c.participantes.map(p => p.persona_id || p.id);
      }
      
      console.log('Participantes extraídos:', participantes);
      
      return participantes.includes(parseInt(usuarioActual.id)) && 
             participantes.includes(parseInt(otroUsuario.id));
    });

    if (existente) {
      console.log('Conversación existente encontrada:', existente);
      setContactoActivo(otroUsuario);
      
      // Asegurar que la conversación tenga la estructura correcta
      const conversacionNormalizada = {
        id: existente.id,
        participantes: existente.participantes || 
                      (existente.personas ? existente.personas.map(p => p.id) : []),
        mensajes: existente.mensajes || []
      };
      
      setConversacion(conversacionNormalizada);
      return;
    }

    try {
      console.log('Creando nueva conversación entre:', usuarioActual.id, 'y', otroUsuario.id);
      
      // Crear nueva conversación
      const axiosConfig = getAxiosConfig();
      const response = await axios.post(`${URLbase}conversaciones`, {
        participantes: [parseInt(usuarioActual.id), parseInt(otroUsuario.id)]
      }, axiosConfig);
      
      console.log('Respuesta completa del servidor al crear conversación:', response.data);
      console.log('Tipo de respuesta:', typeof response.data);
      console.log('Keys de la respuesta:', Object.keys(response.data));
      
      // El backend podría estar devolviendo diferentes formatos, vamos a manejar todos
      let conversacionId;
      
      // Caso 1: El backend devuelve { id: number }
      if (response.data.id) {
        conversacionId = parseInt(response.data.id);
      }
      // Caso 2: El backend devuelve { conversacion: { id: number } }
      else if (response.data.conversacion && response.data.conversacion.id) {
        conversacionId = parseInt(response.data.conversacion.id);
      }
      // Caso 3: El backend devuelve directamente el número
      else if (typeof response.data === 'number') {
        conversacionId = response.data;
      }
      // Caso 4: El backend devuelve string con número
      else if (typeof response.data === 'string' && !isNaN(parseInt(response.data))) {
        conversacionId = parseInt(response.data);
      }
      else {
        console.error('Formato de respuesta no reconocido:', response.data);
        alert('Error: El servidor devolvió un formato no esperado');
        return;
      }
      
      console.log('ID de conversación extraído:', conversacionId);
      
      // Verificar que tengamos un ID válido
      if (!conversacionId || isNaN(conversacionId)) {
        console.error('No se pudo extraer un ID válido de la respuesta del servidor:', response.data);
        alert('Error: El servidor no devolvió un ID válido para la conversación');
        return;
      }
      
      // Crear objeto de conversación con estructura esperada
      const nuevaConversacion = {
        id: conversacionId,
        participantes: [parseInt(usuarioActual.id), parseInt(otroUsuario.id)],
        mensajes: []
      };
      
      console.log('Nueva conversación creada en frontend:', nuevaConversacion);
      
      setConversacion(nuevaConversacion);
      setContactoActivo(otroUsuario);
      
      // Actualizar lista de conversaciones SIN hacer nueva petición al servidor
      setConversaciones(prev => [...prev, nuevaConversacion]);
      
      // Actualizar contactos si es necesario
      if (!contactos.find(c => c.id === otroUsuario.id)) {
        setContactos(prev => [...prev, otroUsuario]);
      }
      
    } catch (error) {
      console.error('Error al crear conversación:', error);
      console.error('Respuesta de error:', error.response?.data);
      alert('Error al crear la conversación');
    }
  };

  const handleEnviarMensaje = async () => {
    if (!nuevoMensaje.trim() || !conversacion) {
      console.log('No se puede enviar:', { nuevoMensaje: nuevoMensaje.trim(), conversacion });
      return;
    }

    console.log('Enviando mensaje:', {
      conversacionId: conversacion.id,
      emisor: parseInt(usuarioActual.id),
      texto: nuevoMensaje
    });

    // VALIDACIÓN IMPORTANTE: Verificar que el ID de conversación sea un número
    if (!conversacion.id || isNaN(parseInt(conversacion.id))) {
      console.error('ID de conversación inválido:', conversacion.id);
      alert('Error: ID de conversación inválido. Por favor, recarga la página.');
      return;
    }

    try {
      const axiosConfig = getAxiosConfig();
      
      console.log('URL completa para enviar mensaje:', `${URLbase}mensajes`);
      console.log('Datos a enviar:', {
        conversacion_id: parseInt(conversacion.id), // Asegurar que sea número
        emisor: parseInt(usuarioActual.id),
        texto: nuevoMensaje,
        fecha: new Date().toISOString()
      });
      console.log('Headers de autorización:', axiosConfig.headers);
      
      // Usar la ruta correcta del backend para enviar mensajes
      const respuesta = await axios.post(
        `${URLbase}mensajes`,
        {
          conversacion_id: parseInt(conversacion.id), // Convertir a número
          emisor: parseInt(usuarioActual.id),
          texto: nuevoMensaje,
          fecha: new Date().toISOString()
        },
        axiosConfig
      );

      console.log('Respuesta del servidor:', respuesta.data);

      // Solo recargar mensajes si el envío fue exitoso
      if (respuesta.status === 200 || respuesta.status === 201) {
        // Recargar los mensajes de la conversación para mostrar el nuevo mensaje
        // Usar la ruta correcta para obtener mensajes de una conversación
        console.log('Recargando mensajes para conversación:', conversacion.id);
        
        try {
          const mensajesActualizados = await axios.get(
            `${URLbase}mensajes?conversacion_id=${conversacion.id}`,
            axiosConfig
          );

          console.log('Mensajes actualizados:', mensajesActualizados.data);

          setConversacion(prev => ({
            ...prev,
            mensajes: mensajesActualizados.data
          }));
          
          setNuevoMensaje('');
          console.log('Mensaje enviado exitosamente');
        } catch (errorMensajes) {
          console.error('Error al recargar mensajes:', errorMensajes);
          // Aún así limpiar el input si el mensaje se envió
          setNuevoMensaje('');
        }
      }
    } catch (error) {
      console.error('Error detallado al enviar mensaje:', {
        error: error.message,
        response: error.response?.data,
        status: error.response?.status,
        statusText: error.response?.statusText,
        url: error.config?.url,
        data: error.config?.data,
        headers: error.config?.headers
      });
      
      // Mostrar información más específica del error
      let mensajeError = 'Error desconocido';
      if (error.response?.data?.message) {
        mensajeError = error.response.data.message;
      } else if (error.response?.data?.error) {
        mensajeError = error.response.data.error;
      } else if (error.response?.statusText) {
        mensajeError = `${error.response.status} - ${error.response.statusText}`;
      } else {
        mensajeError = error.message;
      }
      
      alert(`Error al enviar el mensaje: ${mensajeError}`);
    }
  };

  const handleEliminarMensaje = async (idMensaje) => {
    try {
      const axiosConfig = getAxiosConfig();
      await axios.delete(`${URLbase}mensajes/${idMensaje}`, axiosConfig);
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
      const axiosConfig = getAxiosConfig();
      const respuesta = await axios.put(
        `${URLbase}mensajes/${idMensaje}`,
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

    try {
      const axiosConfig = getAxiosConfig();
      await axios.delete(`${URLbase}conversaciones/${conversacion.id}`, axiosConfig);
      setConversacion(null);
      setContactoActivo(null);

      const convRes = await axios.get(`${URLbase}conversaciones`, axiosConfig);
      const conversacionesRestantes = convRes.data.filter(c => c.participantes.includes(parseInt(usuarioActual.id)));
      const idsConConversacion = conversacionesRestantes.map(c =>
        c.participantes.find(pid => pid !== parseInt(usuarioActual.id))
      );
      const nuevosContactos = usuarios.filter(u => idsConConversacion.includes(u.id));
      setContactos(nuevosContactos);

      window.location.reload();
    } catch (error) {
      console.error('Error al eliminar conversación:', error);
    }
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
                const user = usuarios.find(u => u.id === parseInt(e.target.value));
                if (user) iniciarConversacionCon(user);
                setMostrarListaUsuarios(false);
              }}>
                <option value="">Selecciona un usuario</option>
                {usuarios.filter(u => u.id !== parseInt(usuarioActual.id)).map(c => (
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
              const esPropio = msg.emisor === parseInt(usuarioActual.id);
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
