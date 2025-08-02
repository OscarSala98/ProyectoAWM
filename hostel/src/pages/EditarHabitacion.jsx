import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import HabitacionEditarCard from '../components/HabitacionEditarCard';
import './EditarHabitacion.css';
import axios from 'axios';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import HabitacionFormulario from '../components/HabitacionFormulario';
import ModalConfirmacion from '../components/ModalConfirmacion'; // ✅ importar

const URLbase = 'http://localhost:3002/api/';

const EditarHabitacion = () => {
  const { id } = useParams();
  const [habitaciones, setHabitaciones] = useState([]);
  const [modalVisible, setModalVisible] = useState(false); // ✅
  const [modalMensaje, setModalMensaje] = useState('');     // ✅

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    obtenerHabitaciones();
  }, []);

  useEffect(() => {
    if (location.state?.actualizar) {
      obtenerHabitaciones();
    }
  }, [location.state]);

  const manejarAtras = () => {
    window.history.back();
  };

  const manejarCrear = () => {
    navigate('/admin/editar-habitacion/nueva');
  };

  const obtenerHabitaciones = () => {
    axios.get(`${URLbase}habitaciones`)
      .then((res) => setHabitaciones(res.data))
      .catch((err) => console.error('Error al obtener habitaciones:', err));
  };

  const manejarEliminar = (id) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar esta habitación?')) {
      axios.delete(`${URLbase}habitaciones/${id}`)
        .then(() => {
          setHabitaciones(habitaciones.filter(h => h.id !== id));
          setModalMensaje('✅ Habitación eliminada correctamente');
          setModalVisible(true); // ✅ mostrar modal
        })
        .catch((err) => console.error('Error al eliminar:', err));
    }
  };

  const manejarEditar = (id) => {
    navigate(`/admin/editar-habitacion/${id}`);
  };

  const handleCerrarModal = () => {
    setModalVisible(false);
  };

  return (
    <>
      <Header />
      <div className="editar-habitacion-container">
        <div className="editar-habitacion-header">
          <button className="btn-atras" onClick={manejarAtras}>Atrás</button>
          {id !== 'nueva' && (
            <button className="btn-crear" onClick={manejarCrear}>+ Crear nueva habitación</button>
          )}
        </div>

        {id && id !== 'nueva' ? (
          <HabitacionFormulario />
        ) : id === 'nueva' ? (
          <HabitacionFormulario esNuevo />
        ) : (
          <div className="habitaciones-lista-editar">
            {habitaciones.map(habitacion => (
              <HabitacionEditarCard
                key={habitacion.id}
                habitacion={habitacion}
                onEditar={manejarEditar}
                onEliminar={manejarEliminar}
              />
            ))}
          </div>
        )}
      </div>

      <ModalConfirmacion
        visible={modalVisible}
        mensaje={modalMensaje}
        onClose={handleCerrarModal}
      />

      <Footer />
    </>
  );
};

export default EditarHabitacion;
