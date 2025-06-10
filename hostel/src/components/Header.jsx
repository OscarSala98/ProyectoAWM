import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Header.css';
import { FaUserCircle, FaBars } from 'react-icons/fa';
import logo from '../assets/logo.webp';
import FormularioLogin from './FormularioLogin';
import FormularioRegistro from './FormularioRegistro';

const Header = () => {
  const navigate = useNavigate();
  const [mostrarLogin, setMostrarLogin] = useState(false);
  const [mostrarRegistro, setMostrarRegistro] = useState(false);
  const [mostrarMenu, setMostrarMenu] = useState(false);

  const toggleMenu = () => setMostrarMenu(!mostrarMenu);
  const cerrarMenu = () => setMostrarMenu(false);

  const abrirLogin = () => {
    setMostrarLogin(true);
    cerrarMenu();
  };

  const abrirRegistro = () => {
    setMostrarRegistro(true);
    cerrarMenu();
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
        <div className="user-button" onClick={() => navigate('/perfil')}>
          <FaUserCircle size={20} />
          <span>Usuario</span>
        </div>

        <div className="hamburger" onClick={toggleMenu}>
          <FaBars size={18} />
        </div>

        {mostrarMenu && (
          <div className="hamburger-menu">
            <button onClick={abrirLogin}>Iniciar Sesión</button>
            <button onClick={abrirRegistro}>Registrarse</button>
          </div>
        )}
      </div>

      {mostrarLogin && <FormularioLogin onClose={() => setMostrarLogin(false)} />}
      {mostrarRegistro && <FormularioRegistro onClose={() => setMostrarRegistro(false)} />}
    </header>
  );
};

export default Header;
