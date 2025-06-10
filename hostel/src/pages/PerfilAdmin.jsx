import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import PerfilSidebar from '../components/PerfilSidebar';
import PerfilContenido from '../components/PerfilContenido';
import PerfilOpcionesAdmin from '../components/PerfilOpcionesAdmin';

import './PerfilUsuario.css';

const PerfilAdmin = () => {
  const nombre = 'Oscar'; // Nombre del administrador

  return (
    <>
      <Header />

      <div className="perfil-usuario-container">
        <PerfilSidebar nombre={nombre} />

        <div className="perfil-usuario-derecha">
          <PerfilContenido nombre={nombre} isAdmin />
          <PerfilOpcionesAdmin />
        </div>
      </div>

      <Footer />
    </>
  );
};

export default PerfilAdmin;
