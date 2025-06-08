import React from 'react'; // Importa React, necesario para la creación de componentes en JSX.
import { useNavigate } from 'react-router-dom'; // Importa el hook 'useNavigate' de react-router-dom para navegar entre rutas de la aplicación.
import './Header.css'; // Importa el archivo CSS de estilos personalizados para este componente.
import { FaUserCircle, FaBars } from 'react-icons/fa'; // Importa los íconos de usuario y menú hamburguesa desde react-icons.
import logo from '../assets/logo.webp'; // Importa el logo de la aplicación desde la carpeta assets (formato .webp).

// Componente funcional Header
const Header = () => {
  const navigate = useNavigate(); // Inicializa el hook 'useNavigate' que permite navegar programáticamente a otras rutas.

  return (
    <header className="header"> {/* Contenedor principal del encabezado, asignado con la clase 'header' */}
      {/* Logo del Hostal */}
      <div className="logo-area" onClick={() => navigate('/')} > {/* Área donde se encuentra el logo */}
        <img src={logo} alt="Logo Hostal" className="logo" /> {/* Imagen del logo que redirige a la ruta principal ("/") */}
      </div>

      {/* Enlace para navegar a la página de Habitaciones */}
      <div className="menu-item" onClick={() => navigate('/habitaciones')} > {/* Cuando se hace clic, navega a la página de habitaciones */}
        Habitaciones
      </div>

      {/* Área derecha del encabezado */}
      <div className="right-area"> 
        {/* Botón de usuario con ícono */}
        <div className="user-button">
          <FaUserCircle size={20} /> {/* Ícono de perfil de usuario de react-icons con un tamaño de 20px */}
          <span>Usuario</span> {/* Texto que indica que es el perfil de usuario */}
        </div>

        {/* Ícono del menú hamburguesa para mostrar opciones adicionales en pantallas pequeñas */}
        <div className="hamburger">
          <FaBars size={18} /> {/* Ícono de menú hamburguesa (generalmente utilizado en dispositivos móviles) */}
        </div>
      </div>
    </header>
  );
};

export default Header;  // Exporta el componente para que pueda ser utilizado en otros archivos
