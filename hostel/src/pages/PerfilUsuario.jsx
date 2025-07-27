import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import PerfilSidebar from '../components/PerfilSidebar';
import PerfilContenido from '../components/PerfilContenido';
import PerfilOpciones from '../components/PerfilOpciones';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import './PerfilUsuario.css';

const PerfilUsuario = () => {
  const navigate = useNavigate();
  const usuario = JSON.parse(localStorage.getItem('usuario'));// Obtiene el usuario del localStorage

  useEffect(() => {
    if (!usuario) {
      navigate('/'); // Redirige al inicio si no hay sesión
    }
  }, [usuario, navigate]);

  return (
    <>
      <Header />

      <div className="perfil-usuario-container">
        <PerfilSidebar usuario={usuario} />
        <div className="perfil-usuario-derecha">
          <PerfilContenido usuario={usuario} />
          <PerfilOpciones />
        </div>
      </div>

      <Footer />
    </>
  );
};

export default PerfilUsuario;
