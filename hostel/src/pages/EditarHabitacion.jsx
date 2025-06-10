import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import HabitacionFormulario from '../components/HabitacionFormulario';
import './EditarHabitacion.css';

const EditarHabitacion = () => {
  const manejarAtras = () => {
    window.history.back();
  };

  const manejarGuardar = () => {
    alert('Cambios guardados correctamente ✅');
    // Aquí puedes agregar lógica para enviar los datos
  };

  return (
    <>
      <Header />

      <div className="editar-habitacion-container">
        <div className="editar-habitacion-header">
          <button className="btn-atras" onClick={manejarAtras}>Atrás</button>
          <button className="btn-guardar" onClick={manejarGuardar}>Guardar</button>
        </div>

        <HabitacionFormulario />
      </div>

      <Footer />
    </>
  );
};

export default EditarHabitacion;
