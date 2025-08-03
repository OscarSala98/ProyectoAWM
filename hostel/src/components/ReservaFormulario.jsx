import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './ReservaFormulario.css';

const URLbase = 'http://localhost:3002/api/';

const ReservaFormulario = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const usuario = JSON.parse(localStorage.getItem('usuario'));

  const reservaEdit = state?.reserva || null;
  const habitacionInicial = state?.habitacion || null;

  const [habitacion, setHabitacion] = useState(habitacionInicial);
  const [datos, setDatos] = useState({
    fechaEntrada: '',
    fechaSalida: '',
    adultos: 1,
    ninos: 0
  });
  const [errorMsg, setErrorMsg] = useState('');

  // Cargar habitación si es edición
  useEffect(() => {
    const obtenerHabitacion = async () => {
      if (!habitacion && reservaEdit) {
        try {
          const res = await axios.get(`${URLbase}habitaciones/${reservaEdit.habitacionId}`);
          setHabitacion(res.data);
          setDatos({
            fechaEntrada: reservaEdit.checkIn,
            fechaSalida: reservaEdit.checkOut,
            adultos: reservaEdit.adultos,
            ninos: reservaEdit.ninos
          });
        } catch (err) {
          console.error('Error cargando habitación', err);
        }
      } else if (habitacionInicial && reservaEdit) {
        setDatos({
          fechaEntrada: reservaEdit.checkIn,
          fechaSalida: reservaEdit.checkOut,
          adultos: reservaEdit.adultos,
          ninos: reservaEdit.ninos
        });
      }
    };

    obtenerHabitacion();
  }, [reservaEdit, habitacion, habitacionInicial]);

  const calcularDias = () => {
    if (!datos.fechaEntrada || !datos.fechaSalida) return 0;
    const inicio = new Date(datos.fechaEntrada);
    const fin = new Date(datos.fechaSalida);
    const diff = fin - inicio;
    return Math.max(Math.ceil(diff / (1000 * 60 * 60 * 24)), 1);
  };

  const calcularPrecio = () => {
    if (!habitacion || !habitacion.precioDesglose) return 0;

    const personas = parseInt(datos.adultos) + parseInt(datos.ninos);
    const dias = calcularDias();
    const camas = parseInt(habitacion.camas);

    if (personas > camas) return -1;

    const corto = parseFloat(habitacion.precioDesglose.corto.replace('$', ''));
    const medio = parseFloat(habitacion.precioDesglose.medio.replace('$', ''));
    const largo = parseFloat(habitacion.precioDesglose.largo.replace('$', ''));

    let precioBase = corto;
    if (personas === camas) precioBase = largo;
    else if (personas > 1) precioBase = medio;

    return precioBase * dias;
  };

  const handleChange = (e) => {
    setDatos({ ...datos, [e.target.name]: e.target.value });
    setErrorMsg('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validación básica de fechas
    if (!datos.fechaEntrada || !datos.fechaSalida) {
      setErrorMsg('Debe seleccionar fechas de check-in y check-out');
      return;
    }

    const personas = parseInt(datos.adultos) + parseInt(datos.ninos);
    const camas = parseInt(habitacion.camas);

    if (personas > camas) {
      setErrorMsg(`La habitación solo permite hasta ${camas} personas.`);
      return;
    }

    // Validar fechas
    const fechaEntrada = new Date(datos.fechaEntrada);
    const fechaSalida = new Date(datos.fechaSalida);
    const hoy = new Date();
    hoy.setHours(0, 0, 0, 0);

    if (fechaEntrada < hoy) {
      setErrorMsg('La fecha de check-in no puede ser anterior a hoy');
      return;
    }

    if (fechaSalida <= fechaEntrada) {
      setErrorMsg('La fecha de check-out debe ser posterior a la fecha de check-in');
      return;
    }

    const precioTotal = calcularPrecio();

    // Datos para el backend según el modelo de Reservas
    const datosReserva = {
      habitacionId: parseInt(habitacion.id),
      usuarioId: parseInt(usuario.id),
      usuarioNombre: `${usuario.primerNombre} ${usuario.primerApellido}`,
      correo: usuario.correo,
      checkIn: datos.fechaEntrada,
      checkOut: datos.fechaSalida,
      adultos: parseInt(datos.adultos),
      ninos: parseInt(datos.ninos),
      precio: precioTotal.toString()
      // El estado se asigna automáticamente como 'pendiente' en el backend
    };

    try {
      const axiosConfig = {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json'
        }
      };

      if (reservaEdit) {
        // Si es edición, usar la URL que funcionaba antes
        await axios.put(`${URLbase}reservas/${reservaEdit.id}`, {
          checkIn: datos.fechaEntrada,
          checkOut: datos.fechaSalida,
          adultos: parseInt(datos.adultos),
          ninos: parseInt(datos.ninos),
          precio: precioTotal.toString(),
          estado: 'pendiente' // Forzar estado pendiente al editar
        }, axiosConfig);
        
        alert('✅ Reserva actualizada. Estado cambiado a pendiente para revisión del administrador.');
        
        // Notificar al usuario sobre la actualización
        await axios.post(`${URLbase}notificaciones`, {
          id_usuario: usuario.id,
          tipo: "reserva",
          estado: "sin leer", 
          titulo: `Reserva actualizada: ${habitacion.titulo || habitacion.nombre} - Pendiente de aprobación`
        }, axiosConfig).catch(err => console.warn('No se pudo enviar notificación'));

        // Notificar al administrador sobre la reserva actualizada pendiente
        try {
          console.log('🔔 Enviando notificación al admin por reserva actualizada...');
          const adminId = 1; // ID fijo del administrador
          
          const notificacionAdmin = await axios.post(`${URLbase}notificaciones`, {
            id_usuario: adminId,
            tipo: "reserva",
            estado: "sin leer",
            titulo: `Reserva actualizada pendiente: ${habitacion.titulo || habitacion.nombre} - Usuario: ${usuario.primerNombre} ${usuario.primerApellido}`
          }, axiosConfig);
          
          console.log('✅ Notificación enviada al admin:', notificacionAdmin.data);
        } catch (err) {
          console.error('❌ Error al enviar notificación al admin:', err);
        }
        
      } else {
        // Crear nueva reserva con la URL que funcionaba antes
        const reservaCompleta = {
          ...datosReserva,
          estado: 'pendiente' // Asegurar estado pendiente
        };
        
        const response = await axios.post(`${URLbase}reservas`, reservaCompleta, axiosConfig);
        
        alert('✅ Reserva creada exitosamente. Estado: Pendiente de aprobación por el administrador.');
        
        // Notificar al usuario sobre la nueva reserva
        await axios.post(`${URLbase}notificaciones`, {
          id_usuario: usuario.id,
          tipo: "reserva",
          estado: "sin leer", 
          titulo: `Nueva reserva creada: ${habitacion.titulo || habitacion.nombre} - Pendiente de aprobación`
        }, axiosConfig).catch(err => console.warn('No se pudo enviar notificación'));

        // Notificar al administrador sobre la nueva reserva pendiente
        try {
          console.log('🔔 Enviando notificación al admin por nueva reserva...');
          const adminId = 1; // ID fijo del administrador
          
          const notificacionAdmin = await axios.post(`${URLbase}notificaciones`, {
            id_usuario: adminId,
            tipo: "reserva",
            estado: "sin leer",
            titulo: `Nueva reserva pendiente: ${habitacion.titulo || habitacion.nombre} - Usuario: ${usuario.primerNombre} ${usuario.primerApellido}`
          }, axiosConfig);
          
          console.log('✅ Notificación enviada al admin:', notificacionAdmin.data);
        } catch (err) {
          console.error('❌ Error al enviar notificación al admin:', err);
        }
      }

      navigate('/mis-reservas');
      
    } catch (err) {
      console.error('❌ Error al procesar reserva:', err);
      
      if (err.response?.status === 409) {
        // Conflicto de disponibilidad
        const conflicto = err.response.data;
        setErrorMsg(`❌ La habitación no está disponible en las fechas seleccionadas. ${conflicto.detalle || ''}`);
      } else if (err.response?.status === 400) {
        setErrorMsg(`❌ ${err.response.data.error || 'Datos inválidos'}`);
      } else if (err.response?.status === 404) {
        setErrorMsg('❌ Habitación o usuario no encontrado');
      } else {
        setErrorMsg('❌ Error interno del servidor. Intente nuevamente.');
      }
    }
  };

  if (!usuario) return <p>Error: Usuario no autenticado.</p>;
  if (!habitacion) return <p>Error: No se encontró la habitación.</p>;

  const dias = calcularDias();
  const total = calcularPrecio();

  return (
    <div className="booking-form">
      <h2>{reservaEdit ? 'Editar' : 'Reservar'}: <span>{habitacion.titulo}</span></h2>

      <img src={habitacion.portada} alt={habitacion.titulo} width="300" style={{ borderRadius: '10px' }} />

      <div className="resumen">
        {datos.fechaEntrada && <p><strong>Check In:</strong> {new Date(datos.fechaEntrada).toLocaleDateString()}</p>}
        {dias > 0 && <p><strong>Duración:</strong> {dias} {dias === 1 ? 'día' : 'días'}</p>}
        <p><strong>Personas:</strong> {datos.adultos} adulto(s), {datos.ninos} niño(s)</p>
        {total > 0 && <p><strong>Total:</strong> ${total} USD</p>}
        {errorMsg && <p style={{ color: 'red' }}>{errorMsg}</p>}
      </div>

      <form onSubmit={handleSubmit}>
        <div className="form-row">
          <div className="form-group">
            <label>Check In</label>
            <input type="date" name="fechaEntrada" value={datos.fechaEntrada} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Check Out</label>
            <input type="date" name="fechaSalida" value={datos.fechaSalida} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Adultos</label>
            <input type="number" name="adultos" min="1" value={datos.adultos} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Niños</label>
            <input type="number" name="ninos" min="0" value={datos.ninos} onChange={handleChange} />
          </div>
          <div className="search-btn">
            <button type="submit">{reservaEdit ? 'Actualizar' : 'Reservar'}</button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ReservaFormulario;
