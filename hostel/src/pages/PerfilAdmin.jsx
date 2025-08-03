import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import PerfilSidebar from '../components/PerfilSidebar';
import PerfilContenido from '../components/PerfilContenido';
import PerfilOpcionesAdmin from '../components/PerfilOpcionesAdmin';

import './PerfilUsuario.css';

const PerfilAdmin = () => {
  const navigate = useNavigate();
  const usuario = JSON.parse(localStorage.getItem('usuario'));

  useEffect(() => {
    // Redirige si no hay usuario o si no es admin
    if (!usuario || usuario.tipo !== 'admin') {
      navigate('/');
    }
  }, [usuario, navigate]);

  if (!usuario) return null;

  return (
    <div className="page-layout">
      <div className="page-content">
        <Header />

        <div className="perfil-usuario-container">
          <PerfilSidebar usuario={usuario} />
          <div className="perfil-usuario-derecha">
            <PerfilContenido usuario={usuario} />
            <PerfilOpcionesAdmin usuario={usuario} />
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default PerfilAdmin;
