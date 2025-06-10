import React from 'react';
import FotoUploader from './FotoUploader';
import InfoHabitacion from './InfoHabitacion';
import ServiciosCheckbox from './ServiciosCheckbox';
import PrecioDescuento from './PrecioDescuento';


import './HabitacionFormulario.css';

const HabitacionFormulario = () => {
  return (
    <div className="habitacion-formulario">
      <FotoUploader />
      <div className="formulario-derecha">
        <h2>Información de la habitación</h2>
        <InfoHabitacion />
        <ServiciosCheckbox />
        <PrecioDescuento />
        
      </div>
    </div>
  );
};

export default HabitacionFormulario;
