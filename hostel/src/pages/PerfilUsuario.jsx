// src/pages/PerfilUsuario.jsx
import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import PerfilSidebar from '../components/PerfilSidebar';
import PerfilContenido from '../components/PerfilContenido';
import PerfilOpciones from '../components/PerfilOpciones';

import './PerfilUsuario.css';

const PerfilUsuario = () => {
  const nombre = 'Luis Guerrero'; // Se puede reemplazar luego por un contexto o props

  return (
    <>
      <Header />

      <div className="perfil-usuario-container">
        <PerfilSidebar nombre={nombre} />

        <div className="perfil-usuario-derecha">
          <PerfilContenido nombre={nombre} />
          <PerfilOpciones />
        </div>
      </div>

      <Footer />
    </>
  );
};

export default PerfilUsuario;
