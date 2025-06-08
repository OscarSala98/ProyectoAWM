import React from 'react'; // Importa React, necesario para escribir componentes en JSX.
import './HeroSection.css'; // Importa el archivo de estilos CSS personalizado para este componente.

const HeroSection = ({ children }) => {  // Define un componente funcional llamado "HeroSection", que recibe "children" como una propiedad.
  return (
    <div className="hero-section"> {/* Contenedor principal de la sección hero, asignado con la clase CSS 'hero-section' */}
      <div className="hero-background" /> {/* Un <div> vacío que probablemente se usará para mostrar un fondo en la sección hero */}
      
      <div className="hero-content"> {/* Contenedor para el contenido dentro de la sección hero */}
        <div className="hero-text"> {/* Contenedor para el texto principal */}
          {/* Título de bienvenida */}
          <h1><strong>BIENVENIDOS</strong><br />HOSTAL NOVEL</h1> {/* Título principal con un salto de línea entre 'BIENVENIDOS' y 'HOSTAL NOVEL' */}
          {/* Descripción corta del hostal */}
          <p>
            En el corazón de la ciudad de Quito, se espera un refugio cálido y auténtico.
            Nuestro hostal combina el encanto de una casa tradicional con todas las comodidades
            modernas para que disfrutes una estadía tranquila, segura y llena de buenos momentos.
          </p>
        </div>
        
        {/* Aquí se renderizan los 'children' que son pasados al componente */}
        {children}
      </div>
    </div>
  );
};

export default HeroSection;  // Exporta el componente para que pueda ser utilizado en otras partes de la aplicación.
