import React from 'react'; // Importa React, necesario para escribir componentes en JSX.
import './HabitacionCard.css'; // Importa los estilos CSS personalizados para el componente "HabitacionCard".
import { FaBed, FaShower, FaCar, FaPaw } from 'react-icons/fa'; // Importa los íconos de react-icons para representar diferentes características de la habitación.

const HabitacionCard = ({ titulo, descripcion, imagen, precio, camas, banos, parqueo, mascotas }) => {
  return (
    <div className="habitacion-card"> {/* Contenedor principal de la tarjeta de habitación */}
      <img src={imagen} alt={titulo} className="habitacion-img" /> {/* Imagen de la habitación con el título como texto alternativo */}

      <div className="habitacion-info"> {/* Contenedor para la información de la habitación */}
        <h3 className="habitacion-titulo">{titulo}</h3> {/* Título de la habitación */}
        <p className="habitacion-desc">{descripcion}</p> {/* Descripción breve de la habitación */}

        <div className="habitacion-iconos"> {/* Contenedor para los íconos que representan las características de la habitación */}
          <div><FaBed /> <span>{camas}</span></div> {/* Ícono de cama y el número de camas */}
          <div><FaShower /> <span>{banos}</span></div> {/* Ícono de ducha y el número de baños */}
          <div><FaCar /> <span>{parqueo}</span></div> {/* Ícono de coche y disponibilidad de parqueo */}
          <div><FaPaw /> <span>{mascotas}</span></div> {/* Ícono de huella de mascota y si se aceptan mascotas */}
        </div>

        <div className="habitacion-precio">{precio}</div> {/* Precio de la habitación */}
      </div>
    </div>
  );
};

export default HabitacionCard;  // Exporta el componente para ser utilizado en otros archivos.
