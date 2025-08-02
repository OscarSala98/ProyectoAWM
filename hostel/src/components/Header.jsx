import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Header.css';
import { FaUserCircle, FaBars } from 'react-icons/fa';
import logo from '../assets/logo.webp';
import FormularioLogin from './FormularioLogin';
import FormularioRegistro from './FormularioRegistro';
import ModalConfirmacion from './ModalConfirmacion';
import authService from '../services/authService';

const Header = () => {
  const navigate = useNavigate();
  const [mostrarLogin, setMostrarLogin] = useState(false);
  const [mostrarRegistro, setMostrarRegistro] = useState(false);
  const [mostrarMenu, setMostrarMenu] = useState(false);
  const [mostrarAlerta, setMostrarAlerta] = useState(false);
  const [usuario, setUsuario] = useState(null);

  // Obtener usuario del localStorage cuando el componente se monte
  useEffect(() => {
    const usuarioActual = authService.getCurrentUser();
    setUsuario(usuarioActual);
  }, []);

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

  const manejarClickUsuario = () => {
    if (usuario) {
      // Redirigir según el tipo de usuario
      if (usuario.tipo === 'admin') {
        navigate('/admin/perfil');
      } else {
        navigate('/perfil');
      }
    } else {
      setMostrarAlerta(true);
    }
  };

  const handleLogout = () => {
    authService.logout();
    setUsuario(null);
    cerrarMenu();
    navigate('/');
    window.location.reload(); // Refrescar para aplicar cambios
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
        <div className="user-button" onClick={manejarClickUsuario}>
          <FaUserCircle size={20} />
          
          <span>
            {usuario ? `${usuario.primerNombre} ${usuario.primerApellido}` : 'Usuario'}
          </span>
        </div>

        <div className="hamburger" onClick={toggleMenu}>
          <FaBars size={18} />
        </div>

        {mostrarMenu && (
          <div className="hamburger-menu">
            {usuario ? (
              <>
                <button onClick={() => { 
                  // Redirigir según el tipo de usuario
                  if (usuario.tipo === 'admin') {
                    navigate('/admin/perfil');
                  } else {
                    navigate('/perfil');
                  }
                  cerrarMenu(); 
                }}>
                  Perfil
                </button>
                <button onClick={() => { navigate('/mis-reservas'); cerrarMenu(); }}>
                  Reservaciones
                </button>
                <button onClick={handleLogout}>
                  Cerrar Sesión
                </button>
              </>
            ) : (
              <>
                <button onClick={abrirLogin}>Iniciar Sesión</button>
                <button onClick={abrirRegistro}>Registrarse</button>
              </>
            )}
          </div>
        )}
      </div>

      {mostrarLogin && <FormularioLogin onClose={() => setMostrarLogin(false)} />}
      {mostrarRegistro && <FormularioRegistro onClose={() => setMostrarRegistro(false)} />}
      {mostrarAlerta && (
        <ModalConfirmacion
          mensaje="Debe iniciar sesión para acceder a su perfil."
          visible={mostrarAlerta}
          onClose={() => setMostrarAlerta(false)}
        />
      )}
    </header>
  );
};

export default Header;
