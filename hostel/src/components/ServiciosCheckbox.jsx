import React, { useEffect, useState } from 'react';
import './ServiciosCheckbox.css';
import { FaTv, FaWifi, FaUtensils, FaSnowflake, FaTree } from 'react-icons/fa';

const serviciosBase = [
  { id: 'Smart TV', nombre: 'Smart TV', icono: <FaTv /> },
  { id: 'Wifi', nombre: 'Wifi', icono: <FaWifi /> },
  { id: 'Vista al Patio', nombre: 'Vista al Patio', icono: <FaTree /> },
  { id: 'Alimentación', nombre: 'Alimentación', icono: <FaUtensils /> },
  { id: 'Aire Acondicionado', nombre: 'Aire Acondicionado', icono: <FaSnowflake /> },
];

const ServiciosCheckbox = ({ datos, setDatos }) => {
  const [servicios, setServicios] = useState([]);

  useEffect(() => {
    setServicios(
      serviciosBase.map(servicio => ({
        ...servicio,
        activo: datos.amenities?.includes(servicio.id)
      }))
    );
  }, [datos.amenities]);

  const toggleServicio = (id) => {
    const actualizados = servicios.map(s =>
      s.id === id ? { ...s, activo: !s.activo } : s
    );
    setServicios(actualizados);
    setDatos({
      ...datos,
      amenities: actualizados.filter(s => s.activo).map(s => s.id)
    });
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
                checked={servicio.activo || false}
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
