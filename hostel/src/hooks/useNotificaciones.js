import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

const URLbase = 'http://localhost:3002/api/';

export const useNotificaciones = () => {
  const [notificaciones, setNotificaciones] = useState([]);
  const [cargando, setCargando] = useState(false);
  const [notificacionesSinLeer, setNotificacionesSinLeer] = useState(0);

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

  // Cargar notificaciones
  const cargarNotificaciones = useCallback(async () => {
    if (!usuarioActual?.id) return;

    try {
      setCargando(true);
      const axiosConfig = getAxiosConfig();
      
      const response = await axios.get(
        `${URLbase}notificaciones/usuario/${usuarioActual.id}`, 
        axiosConfig
      );

      const notifs = Array.isArray(response.data) ? response.data : [];
      setNotificaciones(notifs);
      
      // Contar notificaciones sin leer
      const sinLeer = notifs.filter(n => n.estado === 'sin leer').length;
      setNotificacionesSinLeer(sinLeer);
      
    } catch (error) {
      console.error('❌ Error cargando notificaciones:', error);
      setNotificaciones([]);
      setNotificacionesSinLeer(0);
    } finally {
      setCargando(false);
    }
  }, [usuarioActual?.id]);

  // Crear nueva notificación
  const crearNotificacion = useCallback(async (datosNotificacion) => {
    try {
      const axiosConfig = getAxiosConfig();
      
      // Formatear según el backend esperado
      const notificacionFormateada = {
        id_usuario: datosNotificacion.id_usuario || datosNotificacion.usuario_id,
        tipo: datosNotificacion.tipo || 'sistema',
        estado: datosNotificacion.estado || 'sin leer',
        titulo: datosNotificacion.titulo,
        fecha: datosNotificacion.fecha || new Date().toISOString().split('T')[0]
      };
      
      console.log('📤 Enviando notificación:', notificacionFormateada);
      
      const response = await axios.post(
        `${URLbase}notificaciones`, 
        notificacionFormateada, 
        axiosConfig
      );

      console.log('✅ Notificación creada:', response.data);
      
      // Recargar notificaciones
      await cargarNotificaciones();
      
      return response.data;
      
    } catch (error) {
      console.error('❌ Error creando notificación:', error);
      throw error;
    }
  }, [cargarNotificaciones]);

  // Marcar como leída
  const marcarComoLeida = useCallback(async (id) => {
    try {
      const axiosConfig = getAxiosConfig();
      
      // Obtener el tipo original antes de actualizar
      const notificacionOriginal = notificaciones.find(n => n.id === id);
      const tipoOriginal = notificacionOriginal?.tipo || 'sistema';
      
      await axios.put(`${URLbase}notificaciones/${id}`, {
        estado: "leído"
      }, axiosConfig);

      // Actualizar estado local MANTENIENDO el tipo original
      setNotificaciones(prev => {
        const nuevas = prev.map(notif => 
          notif.id === id ? { 
            ...notif, 
            estado: "leído",
            tipo: tipoOriginal  // 🔧 MANTENER el tipo original, no cambiar a "sistema"
          } : notif
        );
        
        // Actualizar contador
        const sinLeer = nuevas.filter(n => n.estado === 'sin leer').length;
        setNotificacionesSinLeer(sinLeer);
        
        return nuevas;
      });
      
    } catch (error) {
      console.error('❌ Error marcando como leída:', error);
      throw error;
    }
  }, [notificaciones]);

  // Eliminar notificación
  const eliminarNotificacion = useCallback(async (id) => {
    try {
      const axiosConfig = getAxiosConfig();
      
      await axios.delete(`${URLbase}notificaciones/${id}`, axiosConfig);

      // Actualizar estado local
      setNotificaciones(prev => {
        const nuevas = prev.filter(notif => notif.id !== id);
        
        // Actualizar contador
        const sinLeer = nuevas.filter(n => n.estado === 'sin leer').length;
        setNotificacionesSinLeer(sinLeer);
        
        return nuevas;
      });
      
    } catch (error) {
      console.error('❌ Error eliminando notificación:', error);
      throw error;
    }
  }, []);

  // Marcar todas como leídas
  const marcarTodasComoLeidas = useCallback(async () => {
    try {
      const promesas = notificaciones
        .filter(n => n.estado === 'sin leer')
        .map(n => marcarComoLeida(n.id));
      
      await Promise.all(promesas);
      
    } catch (error) {
      console.error('❌ Error marcando todas como leídas:', error);
      throw error;
    }
  }, [notificaciones, marcarComoLeida]);

  // Cargar al montar el componente
  useEffect(() => {
    cargarNotificaciones();
  }, [cargarNotificaciones]);

  // Polling para actualizaciones automáticas (cada 30 segundos)
  useEffect(() => {
    const intervalo = setInterval(() => {
      cargarNotificaciones();
    }, 30000); // 30 segundos

    return () => clearInterval(intervalo);
  }, [cargarNotificaciones]);

  return {
    notificaciones,
    notificacionesSinLeer,
    cargando,
    cargarNotificaciones,
    crearNotificacion,
    marcarComoLeida,
    eliminarNotificacion,
    marcarTodasComoLeidas
  };
};
