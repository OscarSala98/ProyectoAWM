import React from 'react';
import './HeroSection.css';

const HeroSection = ({ children }) => {
  return (
    <div className="hero-section">
      <div className="hero-background" />
      <div className="hero-content">
        <div className="hero-text">
          <h1><strong>BIENVENIDOS</strong><br />HOSTAL NOVEL</h1>
          <p>
            En el corazón de la ciudad de Quito, se espera un refugio cálido y auténtico.
            Nuestro hostal combina el encanto de una casa tradicional con todas las comodidades
            modernas para que disfrutes una estadía tranquila, segura y llena de buenos momentos.
          </p>
        </div>
        {children}
      </div>
    </div>
  );
};

export default HeroSection;
