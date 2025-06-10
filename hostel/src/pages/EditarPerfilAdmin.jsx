import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import EditarPerfilFormulario from '../components/EditarPerfilFormulario';
import PerfilSidebar from '../components/PerfilSidebar';
import { useNavigate } from 'react-router-dom';

import './EditarPerfil.css';

const EditarPerfilAdmin = () => {
  const nombre = 'Oscar'; // Nombre del administrador
  const navigate = useNavigate();

  return (
    <div>
      <Header />

      <div className="editar-perfil-container">
        <button className="btn-atras" onClick={() => navigate(-1)}>Atrás</button>

        <PerfilSidebar nombre={nombre} />
        <div className="perfil-usuario-derecha">
          <EditarPerfilFormulario nombre={nombre} />
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default EditarPerfilAdmin;
