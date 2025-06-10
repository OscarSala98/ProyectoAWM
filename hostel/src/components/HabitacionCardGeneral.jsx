import React, { useState } from 'react';
import './HabitacionCardGeneral.css';

const HabitacionCardGeneral = ({ imagenes }) => {
  const [imagenPrincipal, setImagenPrincipal] = useState(imagenes[0]);

  return (
    <div className="galeria-general-container">
      <div className="galeria-general-principal">
        <img src={imagenPrincipal} alt="Principal" />
      </div>
      <div className="galeria-general-miniaturas">
        {imagenes.slice(1).map((img, index) => (
          <img
            key={index}
            src={img}
            alt={`mini-${index}`}
            onClick={() => setImagenPrincipal(img)}
            className={imagenPrincipal === img ? 'active' : ''}
          />
        ))}
      </div>
    </div>
  );
};

export default HabitacionCardGeneral;
