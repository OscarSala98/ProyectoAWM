import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Header.css';
import { FaUserCircle, FaBars } from 'react-icons/fa';
import logo from '../assets/logo.webp';

const Header = () => {
  const navigate = useNavigate();
  const [mostrarMenu, setMostrarMenu] = useState(false); // Estado para mostrar/ocultar el menú

  const toggleMenu = () => {
    setMostrarMenu(!mostrarMenu);
  };

  const cerrarMenu = () => {
    setMostrarMenu(false);
  };

  return (
    <header className="header">
      <div className="logo-area" onClick={() => navigate('/')}>
        <img src={logo} alt="Logo Hostal" className="logo" />
      </div>

      <div className="menu-item" onClick={() => navigate('/habitaciones')}>
        Habitaciones
      </div>

      <div className="right-area">
        <div className="user-button">
          <FaUserCircle size={20} />
          <span>Usuario</span>
        </div>

        <div className="hamburger" onClick={toggleMenu}>
          <FaBars size={18} />
        </div>

        {mostrarMenu && (
          <div className="hamburger-menu">
            <button onClick={() => { navigate('/login'); cerrarMenu(); }}>Iniciar Sesión</button>
            <button onClick={() => { navigate('/registro'); cerrarMenu(); }}>Registrarse</button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
