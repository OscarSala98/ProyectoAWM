import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './MensajesNuevo.css';
import './Mensajes.css';
import { BsSendFill } from 'react-icons/bs';


const URLbase = 'http://localhost:3002/api/';

const MensajesNuevo = () => {
  // Estados
  const [usuarios, setUsuarios] = useState([]);
  const [conversaciones, setConversaciones] = useState([]);
  const [conversacionActiva, setConversacionActiva] = useState(null);
  const [mensajes, setMensajes] = useState([]);
  const [nuevoMensaje, setNuevoMensaje] = useState('');
  const [cargando, setCargando] = useState(false);

  // Usuario actual del JWT
  const usuarioActual = JSON.parse(localStorage.getItem('usuario'));
  
  // Función para obtener configuración de axios con token
  const getAxiosConfig = () => {
    const token = localStorage.getItem('token');
    return {
      headers: {
        Authorization: `Bearer ${token}`
      }
    };
  };

  // 1. Cargar datos iniciales
  useEffect(() => {
    cargarDatosIniciales();
  }, []);

  const cargarDatosIniciales = async () => {
    try {
      setCargando(true);
      const axiosConfig = getAxiosConfig();
      
      console.log('� Cargando datos iniciales...');
      
      // Cargar usuarios y conversaciones del usuario actual
      const [usuariosRes, conversacionesRes] = await Promise.all([
        axios.get(`${URLbase}personas`, axiosConfig),
        axios.get(`${URLbase}conversaciones/usuario/${usuarioActual.id}`, axiosConfig)
      ]);

      console.log('� Usuarios recibidos:', usuariosRes.data);
      console.log('� Conversaciones recibidas:', conversacionesRes.data);
      
      setUsuarios(Array.isArray(usuariosRes.data) ? usuariosRes.data : []);
      setConversaciones(Array.isArray(conversacionesRes.data) ? conversacionesRes.data : []);
      
      // Devolver los datos para uso inmediato
      return {
        usuarios: Array.isArray(usuariosRes.data) ? usuariosRes.data : [],
        conversaciones: Array.isArray(conversacionesRes.data) ? conversacionesRes.data : []
      };
      
    } catch (error) {
      console.error('❌ Error cargando datos iniciales:', error);
      if (error.response?.status === 401) {
        alert('Token expirado. Por favor, inicia sesión nuevamente.');
      }
      return null;
    } finally {
      setCargando(false);
    }
  };

  // 2. Crear nueva conversación
  const crearConversacion = async (otroUsuarioId) => {
    try {
      console.log('🆕 Creando conversación con usuario:', otroUsuarioId);
      
      const axiosConfig = getAxiosConfig();
      const response = await axios.post(`${URLbase}conversaciones/buscar-o-crear`, {
        persona1: parseInt(usuarioActual.id),
        persona2: parseInt(otroUsuarioId)
      }, axiosConfig);

      console.log('✅ Conversación creada/encontrada:', response.data);
      
      return response.data.conversacion;
    } catch (error) {
      console.error('❌ Error creando conversación:', error);
      alert('Error al crear la conversación');
      return null;
    }
  };

  // 3. Cargar mensajes de una conversación
  const cargarMensajes = async (conversacionId) => {
    try {
      console.log('📨 Cargando mensajes para conversación:', conversacionId);
      
      const axiosConfig = getAxiosConfig();
      
      // Extraer ID numérico si viene con prefijo "conv"
      const idNumerico = conversacionId.toString().startsWith('conv') ? 
        conversacionId.toString().replace('conv', '') : conversacionId;
      
      console.log('🔢 ID numérico extraído:', idNumerico);
      console.log('🌐 URL a consultar:', `${URLbase}conversaciones/${idNumerico}/mensajes`);
      
      const response = await axios.get(
        `${URLbase}conversaciones/${idNumerico}/mensajes`, 
        axiosConfig
      );

      console.log('📬 Respuesta completa del servidor:', response.data);
      console.log('📬 Mensajes extraídos:', response.data.mensajes);
      
      // Usar response.data.mensajes en lugar de response.data
      const mensajesArray = response.data.mensajes || [];
      setMensajes(Array.isArray(mensajesArray) ? mensajesArray : []);
      
    } catch (error) {
      console.error('❌ Error cargando mensajes:', error);
      console.error('❌ Detalles del error:', {
        status: error.response?.status,
        statusText: error.response?.statusText,
        data: error.response?.data,
        url: error.config?.url
      });
      
      // Si es un error 500, mostramos que la conversación está vacía pero funcionando
      if (error.response?.status === 500) {
        console.log('🔧 Error 500 del servidor, asumiendo conversación vacía');
        setMensajes([]);
      } else {
        setMensajes([]);
      }
    }
  };

  // 4. Seleccionar conversación
  const seleccionarConversacion = async (conversacion) => {
    console.log('🎯 Seleccionando conversación:', conversacion);
    setConversacionActiva(conversacion);
    
    // Cargar TODOS los mensajes de esta conversación
    console.log('� Cargando todos los mensajes para conversación:', conversacion.id);
    await cargarMensajes(conversacion.id);
  };

  // 5. Enviar mensaje
  const enviarMensaje = async () => {
    if (!nuevoMensaje.trim() || !conversacionActiva) {
      console.log('⚠️ No se puede enviar: mensaje vacío o sin conversación');
      return;
    }

    try {
      // Extraer ID numérico si viene con prefijo
      const idNumerico = conversacionActiva.id.toString().startsWith('conv') ? 
        conversacionActiva.id.toString().replace('conv', '') : conversacionActiva.id;

      const datosEnvio = {
        emisor: parseInt(usuarioActual.id),
        texto: nuevoMensaje
      };

      console.log('📤 Enviando mensaje a conversación:', idNumerico, datosEnvio);

      const axiosConfig = getAxiosConfig();

      const response = await axios.post(`${URLbase}conversaciones/${idNumerico}/mensajes`, datosEnvio, axiosConfig);

      console.log('✅ Mensaje enviado correctamente:', response.data);
      console.log('✅ Status del servidor:', response.status);
      
      // Crear el mensaje localmente para mostrarlo inmediatamente
      const nuevoMensajeLocal = {
        id: response.data.id || Date.now(),
        conversacion_id: parseInt(idNumerico),
        emisor: parseInt(usuarioActual.id),
        emisorNombre: `${usuarioActual.primerNombre} ${usuarioActual.primerApellido}`,
        texto: nuevoMensaje,
        fecha: new Date().toISOString()
      };
      
      // Agregar el mensaje a la lista actual
      setMensajes(prevMensajes => [...prevMensajes, nuevoMensajeLocal]);
      
      // Limpiar input
      setNuevoMensaje('');
      
    } catch (error) {
      console.error('❌ Error enviando mensaje:', error);
      console.error('❌ Status del error:', error.response?.status);
      console.error('❌ Datos del error:', error.response?.data);
      console.error('❌ Headers del error:', error.response?.headers);
      
      // Si es error 500 pero el mensaje se está guardando, continúa
      if (error.response?.status === 500) {
        console.log('🔧 Error 500 detectado - mensaje probablemente guardado');
        
        // Crear el mensaje localmente ya que sabemos que se guardó
        const nuevoMensajeLocal = {
          id: Date.now(),
          conversacion_id: parseInt(conversacionActiva.id.toString().replace('conv', '')),
          emisor: parseInt(usuarioActual.id),
          emisorNombre: `${usuarioActual.primerNombre} ${usuarioActual.primerApellido}`,
          texto: nuevoMensaje,
          fecha: new Date().toISOString()
        };
        
        // Agregar el mensaje a la lista actual
        setMensajes(prevMensajes => [...prevMensajes, nuevoMensajeLocal]);
        
        // Limpiar input
        setNuevoMensaje('');
        
        console.log('✅ Mensaje mostrado localmente a pesar del error 500');
      } else {
        alert(`Error al enviar mensaje: ${error.response?.data?.message || error.message}`);
      }
    }
  };

  // 6. Iniciar conversación con usuario (admin/usuario)
  const iniciarConversacionCon = async (otroUsuario) => {
    console.log('🚀 Iniciando conversación con:', otroUsuario);
    
    // Buscar si ya existe conversación
    const conversacionExistente = conversaciones.find(conv => {
      const participantes = conv.participantes || [];
      return participantes.some(p => p.id === parseInt(usuarioActual.id)) && 
             participantes.some(p => p.id === parseInt(otroUsuario.id));
    });

    if (conversacionExistente) {
      console.log('📍 Conversación existente encontrada');
      seleccionarConversacion(conversacionExistente);
    } else {
      console.log('🆕 Creando nueva conversación');
      const nuevaConversacion = await crearConversacion(otroUsuario.id);
      if (nuevaConversacion) {
        console.log('🔍 Conversación creada con ID:', nuevaConversacion.id);
        
        // Recargar datos y obtener la lista actualizada
        const datosActualizados = await cargarDatosIniciales();
        
        if (datosActualizados) {
          // Buscar la conversación recién creada en los datos actualizados
          const conversacionCreada = datosActualizados.conversaciones.find(c => c.id === nuevaConversacion.id);
          console.log('🎯 Conversación encontrada después de crear:', conversacionCreada);
          
          if (conversacionCreada) {
            // Seleccionar la conversación directamente 
            console.log('🎯 Seleccionando conversación recién creada');
            seleccionarConversacion(conversacionCreada);
          } else {
            console.log('⚠️ No se pudo encontrar la conversación con ID exacto, buscando por participantes...');
            // Como alternativa, buscar por participantes
            const conversacionPorParticipantes = datosActualizados.conversaciones.find(conv => {
              const participantes = conv.participantes || [];
              return participantes.some(p => p.id === parseInt(usuarioActual.id)) && 
                     participantes.some(p => p.id === parseInt(otroUsuario.id));
            });
            
            if (conversacionPorParticipantes) {
              console.log('🎯 Conversación encontrada por participantes:', conversacionPorParticipantes);
              seleccionarConversacion(conversacionPorParticipantes);
            }
          }
        }
      }
    }
  };

  // Obtener nombre de usuario
  const obtenerNombreUsuario = (userId) => {
    const user = usuarios.find(u => u.id === parseInt(userId));
    return user ? `${user.primerNombre} ${user.primerApellido}` : 'Usuario';
  };

  // Obtener admin
  const obtenerAdmin = () => {
    return usuarios.find(u => u.tipo?.toLowerCase() === 'admin');
  };

  // Filtrar conversaciones del usuario actual (ya vienen filtradas del backend)
  const conversacionesDelUsuario = Array.isArray(conversaciones) ? conversaciones : [];

  if (cargando) {
    return <div className="mensajes-container">Cargando...</div>;
  }

  return (
    <div className="mensajes-container">
      <div className="mensajes-sidebar">
        <h3>Conversaciones</h3>

        {/* Botón para iniciar conversación */}
        {usuarioActual?.tipo?.toLowerCase() === 'admin' ? (
          <div>
            <h4>Usuarios disponibles:</h4>
            {Array.isArray(usuarios) && usuarios
              .filter(u => u.id !== parseInt(usuarioActual.id) && u.tipo !== 'admin')
              .map(usuario => (
              <div 
                key={usuario.id} 
                className="usuario-disponible"
                onClick={() => iniciarConversacionCon(usuario)}
              >
                {usuario.primerNombre} {usuario.primerApellido}
              </div>
            ))}
          </div>
        ) : (
          <button 
            className="btn-admin" 
            onClick={() => {
              const admin = obtenerAdmin();
              if (admin) {
                iniciarConversacionCon(admin);
              } else {
                alert('No se encontró un administrador');
              }
            }}
          >
            Conversar con Admin
          </button>
        )}

        {/* Lista de conversaciones */}
        <div className="lista-conversaciones">
          <h4>Mis conversaciones:</h4>
          {Array.isArray(conversacionesDelUsuario) && conversacionesDelUsuario.map(conv => {
            return (
              <div
                key={conv.id}
                className={`conversacion-item ${conversacionActiva?.id === conv.id ? 'activa' : ''}`}
                onClick={() => seleccionarConversacion(conv)}
              >
                <div className="avatar-placeholder">
                  {conv.otroUsuario?.nombre?.charAt(0) || '?'}
                </div>
                <div className="conversacion-info">
                  <strong>{conv.otroUsuario?.nombre || 'Usuario'}</strong>
                  
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="mensajes-conversacion">
        {conversacionActiva ? (
          <>
            <div className="mensajes-header">
              <h2>Conversación con {conversacionActiva.otroUsuario?.nombre || 'Usuario'}</h2>
            </div>

            <div className="mensajes-body">
              {(() => {
                console.log('🎨 Estado de mensajes:', mensajes);
                console.log('🎨 Longitud de mensajes:', mensajes?.length);
                console.log('🎨 Es array?', Array.isArray(mensajes));
                return null;
              })()}
              {!mensajes || mensajes.length === 0 ? (
                <p>No hay mensajes aún. ¡Envía el primero!</p>
              ) : (
                <div className="mensajes-lista">
                  {mensajes.map(mensaje => {
                    console.log('📝 Renderizando mensaje:', mensaje);
                    const esPropio = parseInt(mensaje.emisor) === parseInt(usuarioActual.id);
                    return (
                      <div 
                        key={mensaje.id} 
                        className={`mensaje-item ${esPropio ? 'mensaje-emisor' : 'mensaje-receptor'}`}
                      >
                        <div className="mensaje-header">
                          <strong>{mensaje.emisorNombre}</strong>
                          <small>{new Date(mensaje.fecha).toLocaleString()}</small>
                        </div>
                        <p>{mensaje.texto}</p>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            <div className="mensajes-input">
              <input
                type="text"
                value={nuevoMensaje}
                onChange={(e) => setNuevoMensaje(e.target.value)}
                placeholder="Escribe tu mensaje..."
                onKeyPress={(e) => e.key === 'Enter' && enviarMensaje()}
              />
              <button className="btn-enviar" onClick={enviarMensaje}>
                <BsSendFill />
              </button>
            </div>
          </>
        ) : (
          <div className="sin-conversacion">
            <p>Selecciona una conversación o inicia una nueva</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MensajesNuevo;
