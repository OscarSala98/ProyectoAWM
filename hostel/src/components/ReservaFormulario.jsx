import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './ReservaFormulario.css';

const ReservaFormulario = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const habitacion = state?.habitacion;

  const usuario = JSON.parse(localStorage.getItem('usuario'));

  const [datos, setDatos] = useState({
    fechaEntrada: '',
    fechaSalida: '',
    adultos: 1,
    ninos: 0
  });

  const [errorMsg, setErrorMsg] = useState('');

  const calcularDias = () => {
    if (!datos.fechaEntrada || !datos.fechaSalida) return 0;
    const entrada = new Date(datos.fechaEntrada);
    const salida = new Date(datos.fechaSalida);
    const diferencia = salida - entrada;
    return Math.max(Math.ceil(diferencia / (1000 * 60 * 60 * 24)), 1);
  };

  const calcularPrecio = () => {
    const totalPersonas = parseInt(datos.adultos) + parseInt(datos.ninos);
    const dias = calcularDias();
    const camas = parseInt(habitacion.camas);

    if (totalPersonas > camas) return -1;

    const corto = parseFloat(habitacion.precioDesglose.corto.replace('$', ''));
    const medio = parseFloat(habitacion.precioDesglose.medio.replace('$', ''));
    const largo = parseFloat(habitacion.precioDesglose.largo.replace('$', ''));

    let basePrecio = corto;

    if (totalPersonas === camas) basePrecio = largo;
    else if (totalPersonas > 1) basePrecio = medio;

    return basePrecio * dias;
  };

  const handleChange = (e) => {
    setDatos({ ...datos, [e.target.name]: e.target.value });
    setErrorMsg('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const totalPersonas = parseInt(datos.adultos) + parseInt(datos.ninos);
    const camas = parseInt(habitacion.camas);

    if (totalPersonas > camas) {
      setErrorMsg(`Esta habitación admite hasta ${camas} personas.`);
      return;
    }

    const precioTotal = calcularPrecio();

    const nuevaReserva = {
      id: Date.now().toString(),
      habitacionId: habitacion.id,
      tituloHabitacion: habitacion.titulo,
      imagen: habitacion.portada,
      usuarioId: usuario.id,
      usuarioNombre: `${usuario.primerNombre} ${usuario.segundoNombre} ${usuario.primerApellido}`,
      correo: usuario.correo,
      checkIn: datos.fechaEntrada,
      checkOut: datos.fechaSalida,
      adultos: datos.adultos,
      ninos: datos.ninos,
      personas: `${datos.adultos} Adulto(s), ${datos.ninos} Niño(s)`,
      precio: `$${precioTotal}`,
      estado: 'confirmada',
      fechaCreacion: new Date().toISOString()
    };

    try {
      await axios.post('http://localhost:3002/reservas', nuevaReserva);

      await axios.post('http://localhost:3002/notificaciones', {
        id: Date.now().toString(),
        texto: `Nueva reserva: ${habitacion.titulo}`,
        fecha: new Date().toISOString().split('T')[0]
      });

      alert('¡Reserva registrada!');
      navigate('/mis-reservas');
    } catch (error) {
      console.error('Error al registrar reserva:', error);
    }
  };

  if (!habitacion) return <p>Error: No se encontró la habitación.</p>;
  if (!usuario) return <p>Error: Usuario no autenticado.</p>;

  const precioTotal = calcularPrecio();
  const duracion = calcularDias();

  return (
    <div className="booking-form">
      <h2>Reservar: <span>{habitacion.titulo}</span></h2>

      <img src={habitacion.portada} alt={habitacion.titulo} width="300" style={{ borderRadius: '10px' }} />

      <div style={{ margin: '1rem 0', padding: '1rem', background: '#fff', borderRadius: '10px' }}>
        {datos.fechaEntrada && <p><strong>Check In:</strong> {new Date(datos.fechaEntrada).toLocaleDateString()}</p>}
        {duracion > 0 && <p><strong>Duración:</strong> {duracion} {duracion === 1 ? 'día' : 'días'}</p>}
        <p><strong>Personas:</strong> {datos.adultos} adulto(s), {datos.ninos} niño(s)</p>
        {precioTotal > 0 && <p><strong>Total:</strong> ${precioTotal} USD</p>}
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
            <button type="submit">Reservar</button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ReservaFormulario;
