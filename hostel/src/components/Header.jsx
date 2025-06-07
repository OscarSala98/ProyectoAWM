import React from 'react';
import './Header.css';
import { FaUserCircle, FaBars } from 'react-icons/fa';
import logo from '../assets/logo.webp'; // Reemplaza con el nombre real

const Header = () => {
  return (
    <header className="header">
      <div className="logo-area">
        <img src={logo} alt="Logo Hostal" className="logo" />
        <span className="menu-item">Habitaciones</span>
      </div>

      <div className="right-area">
        <div className="user-button">
          <FaUserCircle size={20} />
          <span>Usuario</span>
        </div>
        <div className="hamburger">
          <FaBars size={18} />
        </div>
      </div>
    </header>
  );
};

export default Header;
