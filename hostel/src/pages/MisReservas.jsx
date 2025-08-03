import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ReservasTabs from '../components/ReservasTabs';
import ReservaCard from '../components/ReservaCard';
import './Reservas.css';

const URLbase = 'http://localhost:3002/api/';

const MisReservas = () => {
  const [tabActivo, setTabActivo] = useState('futura');
  const [reservas, setReservas] = useState([]);
  const [cargando, setCargando] = useState(true);

  const usuario = JSON.parse(localStorage.getItem('usuario'));

  useEffect(() => {
    // Solo cargar una vez cuando el componente se monta
    const cargarReservasUsuario = async () => {
      if (!usuario?.id) {
        setReservas([]);
        setCargando(false);
        return;
      }

      try {
        setCargando(true);
        const axiosConfig = {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          }
        };

        console.log('🔍 Cargando reservas para usuario ID:', usuario.id);
        
        // Usar la URL que funcionaba antes con filtro explícito
        const res = await axios.get(`${URLbase}reservas?usuarioId=${usuario.id}`, axiosConfig);
        
        // Ajustar según la estructura de respuesta del backend
        let reservasDelBackend = [];
        if (Array.isArray(res.data)) {
          reservasDelBackend = res.data;
        } else if (res.data?.reservas && Array.isArray(res.data.reservas)) {
          reservasDelBackend = res.data.reservas;
        } else {
          console.error('Respuesta inesperada del servidor:', res.data);
          reservasDelBackend = [];
        }

        // FILTRO ADICIONAL EN EL FRONTEND para asegurar que solo veamos reservas del usuario actual
        const reservasFiltradas = reservasDelBackend.filter(reserva => {
          const esDelUsuario = 
            reserva.usuarioId === usuario.id || 
            reserva.id_usuario === usuario.id ||
            reserva.usuario_id === usuario.id;
          
          return esDelUsuario;
        });

        console.log(`✅ Reservas del usuario cargadas: ${reservasFiltradas.length}`);
        setReservas(reservasFiltradas);
        
      } catch (err) {
        console.error('❌ Error cargando reservas:', err);
        if (err.response?.status === 401) {
          // Token expirado, redirigir al login
          localStorage.removeItem('token');
          localStorage.removeItem('usuario');
          window.location.href = '/login';
        }
        setReservas([]);
      } finally {
        setCargando(false);
      }
    };

    cargarReservasUsuario();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // ⚠️ DEPENDENCIAS VACÍAS INTENCIONALMENTE - Solo se ejecuta una vez al montar

  const cancelarReserva = async (id) => {
    try {
      const axiosConfig = {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        }
      };

      await axios.delete(`${URLbase}reservas/${id}`, axiosConfig);
      
      // Actualizar la lista local sin recargar desde el servidor
      setReservas(prev => prev.filter(r => r.id !== id));
      
      // Mostrar confirmación
      alert('✅ Reserva cancelada exitosamente');
      
      // Notificar sobre la cancelación (opcional, no bloquea)
      axios.post(`${URLbase}notificaciones`, {
        id_usuario: usuario.id,
        tipo: "reserva",
        estado: "sin leer", 
        titulo: `Reserva cancelada`
      }, axiosConfig).catch(err => console.warn('No se pudo enviar notificación'));
      
    } catch (error) {
      console.error('Error al cancelar reserva:', error);
      alert('Error al cancelar la reserva. Intente nuevamente.');
    }
  };

  const reservasFiltradas = reservas.filter(r => {
    const esFutura = new Date(r.checkIn) >= new Date();
    return tabActivo === 'futura' ? esFutura : !esFutura;
  });

  const manejarAtras = () => {
    window.history.back();
  };

  const recargarReservas = async () => {
    if (!usuario?.id || cargando) return;
    
    setCargando(true);
    
    try {
      const axiosConfig = {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        }
      };

      const res = await axios.get(`${URLbase}reservas?usuarioId=${usuario.id}`, axiosConfig);
      
      let reservasDelBackend = [];
      if (Array.isArray(res.data)) {
        reservasDelBackend = res.data;
      } else if (res.data?.reservas && Array.isArray(res.data.reservas)) {
        reservasDelBackend = res.data.reservas;
      }

      const reservasFiltradas = reservasDelBackend.filter(reserva => {
        return reserva.usuarioId === usuario.id || 
               reserva.id_usuario === usuario.id ||
               reserva.usuario_id === usuario.id;
      });

      setReservas(reservasFiltradas);
      
    } catch (err) {
      console.error('Error recargando reservas:', err);
    } finally {
      setCargando(false);
    }
  };

  return (
    <div>
      <Header />
      <div className="reservas-container">
        <div className="reservas-header">
          <button className="btn-atras" onClick={manejarAtras}>Atrás</button>
          <button className="btn-recargar" onClick={recargarReservas} disabled={cargando}>
            {cargando ? 'Cargando...' : '🔄 Recargar'}
          </button>
        </div>
        <h2 className="reservas-titulo">Mis Reservas</h2>
        
        {/* Info de debug temporal */}
        <div style={{ fontSize: '0.8rem', color: '#666', marginBottom: '1rem' }}>
          Usuario: {usuario?.primerNombre} {usuario?.primerApellido} (ID: {usuario?.id}) | 
          Reservas cargadas: {reservas.length}
        </div>

        <ReservasTabs tabActivo={tabActivo} setTabActivo={setTabActivo} />

        {cargando ? (
          <p>Cargando reservas...</p>
        ) : reservasFiltradas.length === 0 ? (
          <p className="sin-reservas">No tienes reservas {tabActivo === 'futura' ? 'futuras' : 'pasadas'}.</p>
        ) : (
          <div className="reservas-lista">
            {reservasFiltradas.map(reserva => (
              <ReservaCard
                key={reserva.id}
                reserva={reserva}
                onCancelar={cancelarReserva}
              />
            ))}
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default MisReservas;
