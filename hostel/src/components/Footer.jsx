import React from 'react'; // Importa React, necesario para crear el componente en JSX
import './Footer.css'; // Importa el archivo de estilos CSS personalizado para el footer
import logoVertical from '../assets/logo.webp'; // Importa la imagen del logo (en formato .webp) desde la carpeta de assets
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa'; // Importa los íconos de redes sociales desde react-icons

// Definición del componente funcional Footer
const Footer = () => {
  return (
    <footer className="footer"> {/* Elemento <footer> que contiene el contenido del pie de página */}
      <div className="footer-logo"> {/* Contenedor para el logo */}
        <img src={logoVertical} alt="Grupo Novel" /> {/* Imagen del logo, con texto alternativo */}
      </div>
      <div className="footer-info"> {/* Contenedor para la información de contacto */}
        <h4>CONTACTOS DE INFORMACIÓN</h4> {/* Título que indica la sección de contacto */}
        <p>Teléfono: 593 - 0995639172</p> {/* Número de teléfono de contacto */}
        <p>Email: info@hostelnovel.com</p> {/* Dirección de correo electrónico */}
        <p>Dirección: Av. París y Av. Tómas de Berlanga</p> {/* Dirección física de la empresa */}
      </div>
      <div className="footer-icons"> {/* Contenedor para los íconos de redes sociales */}
        {/* Íconos de redes sociales importados desde react-icons */}
        <FaFacebookF /> {/* Ícono de Facebook */}
        <FaTwitter /> {/* Ícono de Twitter */}
        <FaInstagram /> {/* Ícono de Instagram */}
        <FaLinkedinIn /> {/* Ícono de LinkedIn */}
      </div>
    </footer>
  );
};

// Exportación del componente para su uso en otros archivos
export default Footer;
