import React from 'react';
import './InfoHabitacion.css';

const InfoHabitacion = ({ datos, onChange }) => {
  const handlePrecioChange = (e) => {
    const { name, value } = e.target;
    const cleanValue = value.replace('$', '');
    const nuevoPrecioDesglose = {
      ...datos.precioDesglose,
      [name]: cleanValue
    };

    // Construir precio combinado si hay corto y largo
    const precioCorto = nuevoPrecioDesglose.corto || '';
    const precioLargo = nuevoPrecioDesglose.largo || '';
    const precioFormateado = (precioCorto && precioLargo) ? `$${precioCorto} - $${precioLargo}` : '';

    // Actualizar desglose
    onChange({
      target: {
        name: 'precioDesglose',
        value: nuevoPrecioDesglose
      }
    });

    // Actualizar campo general
    onChange({
      target: {
        name: 'precio',
        value: precioFormateado
      }
    });
  };

  const handleNumericChange = (e) => {
    const { name, value } = e.target;
    onChange({
      target: {
        name,
        value: parseInt(value, 10) || 0
      }
    });
  };

  return (
    <div className="info-habitacion">
      <div className="info-habitacion-grupo">
        <div className="campo">
          <label>Número de Habitación</label>
          <input
            type="text"
            name="id_habitacion"
            value={datos.id_habitacion || ''}
            onChange={onChange}
            placeholder="Ej: HS303"
          />
        </div>
        <div className="campo">
          <label>Título</label>
          <input
            type="text"
            name="titulo"
            value={datos.titulo || ''}
            onChange={onChange}
            placeholder="Ej: Habitación Simple 303"
          />
        </div>
      </div>

      <div className="info-habitacion-grupo">
        <div className="campo">
          <label>Tipo de Habitación</label>
          <select name="tipo" value={datos.tipo || ''} onChange={onChange}>
            <option value="Simple">Simple</option>
            <option value="Doble">Doble</option>
            <option value="Delux">Delux</option>
          </select>
        </div>
        <div className="campo">
          <label>Descripción Corta</label>
          <input
            type="text"
            name="descripcion"
            value={datos.descripcion || ''}
            onChange={onChange}
            placeholder="Ej: 2 Plazas"
          />
        </div>
      </div>

      <div className="info-habitacion-grupo">
        <div className="campo" style={{ flex: '1 1 100%' }}>
          <label>Descripción Larga</label>
          <input
            type="text"
            name="descripcionLarga"
            value={datos.descripcionLarga || ''}
            onChange={onChange}
            placeholder="Ej: Habitación cómoda ideal para una o dos personas..."
          />
        </div>
      </div>

      <div className="info-habitacion-grupo">
        {['camas', 'banos', 'parqueo', 'mascotas'].map((campo) => (
          <div className="campo" key={campo}>
            <label>{campo.charAt(0).toUpperCase() + campo.slice(1)}</label>
            <input
              type="number"
              name={campo}
              value={datos[campo] !== undefined ? datos[campo] : ''}
              onChange={handleNumericChange}
              min="0"
            />
          </div>
        ))}
      </div>

      <div className="info-habitacion-grupo">
        <div className="campo">
          <label>Precio Corto ($)</label>
          <input
            type="text"
            name="corto"
            value={`$${datos.precioDesglose?.corto || ''}`}
            onChange={handlePrecioChange}
            placeholder="Ej: 1250"
          />
        </div>
        <div className="campo">
          <label>Precio Medio ($)</label>
          <input
            type="text"
            name="medio"
            value={`$${datos.precioDesglose?.medio || ''}`}
            onChange={handlePrecioChange}
            placeholder="Ej: 1500"
          />
        </div>
        <div className="campo">
          <label>Precio Largo ($)</label>
          <input
            type="text"
            name="largo"
            value={`$${datos.precioDesglose?.largo || ''}`}
            onChange={handlePrecioChange}
            placeholder="Ej: 2000"
          />
        </div>
      </div>

      {/* ✅ Mostrar el label del precio combinado */}
      <div className="info-habitacion-grupo">
        <div className="campo precio-total">
          <label>Precio Total (Automático)</label>
          <div className="precio-total-valor">
            ${datos.precioDesglose?.corto || '0'} - ${datos.precioDesglose?.largo || '0'}
          </div>
        </div>
      </div>

    </div>
  );
};

export default InfoHabitacion;
