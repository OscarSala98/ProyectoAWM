import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Header.css';
import { FaUserCircle, FaBars } from 'react-icons/fa';
import logo from '../assets/logo.webp';

const Header = () => {
  const navigate = useNavigate();

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
          <FaUserCircle size={20} />{/*This icon represents the user profile button*/}
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
