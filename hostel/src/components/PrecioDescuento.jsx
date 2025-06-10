import React, { useState } from 'react';
import './PrecioDescuento.css';

const PrecioDescuento = () => {
  const [precio, setPrecio] = useState('');
  const [descuentoActivo, setDescuentoActivo] = useState(true);

  return (
    <div className="precio-descuento">
      <div className="campo-precio">
        <label>Precio por Noche</label>
        <input
          type="number"
          placeholder="$0.00"
          value={precio}
          onChange={(e) => setPrecio(e.target.value)}
          min="0"
        />
      </div>

      <div className="campo-radio">
        <label>Descuento Activo</label>
        <div className="opciones-radio">
          <label>
            <input
              type="radio"
              name="descuento"
              checked={descuentoActivo}
              onChange={() => setDescuentoActivo(true)}
            />
            Sí
          </label>
          <label>
            <input
              type="radio"
              name="descuento"
              checked={!descuentoActivo}
              onChange={() => setDescuentoActivo(false)}
            />
            No
          </label>
        </div>
      </div>
    </div>
  );
};

export default PrecioDescuento;
