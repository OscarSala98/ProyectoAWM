import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import HabitacionEditarCard from '../components/HabitacionEditarCard';
import './EditarHabitacion.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import HabitacionFormulario from '../components/HabitacionFormulario'; // Asegúrate de que este componente exista



const EditarHabitacion = () => {
  const { id } = useParams();
  const [habitaciones, setHabitaciones] = useState([]);
  const navigate = useNavigate();
  const manejarAtras = () => {
    window.history.back();
  };

  /*const manejarGuardar = () => {
    alert('Cambios guardados correctamente ✅');
  };*/

  const obtenerHabitaciones = () => {
    axios.get('http://localhost:3002/habitaciones')
      .then((res) => setHabitaciones(res.data))
      .catch((err) => console.error('Error al obtener habitaciones:', err));
  };

  const manejarEliminar = (id) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar esta habitación?')) {
      axios.delete(`http://localhost:3002/habitaciones/${id}`)
        .then(() => {
          setHabitaciones(habitaciones.filter(h => h.id !== id));
        })
        .catch((err) => console.error('Error al eliminar:', err));
    }
  };

  const manejarEditar = (id) => {
    
    navigate(`/admin/editar-habitacion/${id}`);
  };

  useEffect(() => {
    obtenerHabitaciones();
  }, []);

  return (
    <>
    <Header />

    <div className="editar-habitacion-container">
      <div className="editar-habitacion-header">
        <button className="btn-atras" onClick={manejarAtras}>Atrás</button>
      </div>

      {/* Si hay un ID en la URL, mostrar el formulario */}
      {id ? (
        <HabitacionFormulario />
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

    <Footer />
  </>
  );
};

export default EditarHabitacion;
