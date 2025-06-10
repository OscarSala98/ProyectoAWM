import React, { useState } from 'react';
import './ServiciosCheckbox.css';
import { FaTv, FaWifi, FaUtensils, FaSnowflake, FaTree } from 'react-icons/fa';

const serviciosIniciales = [
  { id: 'tv', nombre: 'Smart TV', icono: <FaTv />, activo: true },
  { id: 'wifi', nombre: 'Wifi', icono: <FaWifi />, activo: true },
  { id: 'vista', nombre: 'Vista al Patio', icono: <FaTree />, activo: false },
  { id: 'alimentacion', nombre: 'Alimentación', icono: <FaUtensils />, activo: true },
  { id: 'ac', nombre: 'Aire Acondicionado', icono: <FaSnowflake />, activo: true },
];

const ServiciosCheckbox = () => {
  const [servicios, setServicios] = useState(serviciosIniciales);

  const toggleServicio = (id) => {
    setServicios(prev =>
      prev.map(s => s.id === id ? { ...s, activo: !s.activo } : s)
    );
  };

  return (
    <div className="servicios-checkbox">
      <h4>Servicios incluidos</h4>
      <ul>
        {servicios.map(servicio => (
          <li key={servicio.id}>
            <label>
              <input
                type="checkbox"
                checked={servicio.activo}
                onChange={() => toggleServicio(servicio.id)}
              />
              <span className="icono">{servicio.icono}</span>
              {servicio.nombre}
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ServiciosCheckbox;
