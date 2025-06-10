import React from 'react';
import './PerfilContenido.css';
import { useNavigate } from 'react-router-dom';

const PerfilContenido = ({ nombre, isAdmin = false }) => {
  const navigate = useNavigate();

  const manejarEdicion = () => {
    navigate(isAdmin ? '/admin/editar-perfil' : '/editar-perfil');
  };

  return (
    <div className="perfil-contenido">
      <h2>Hola, {nombre}</h2>
      <button className="btn-editar" onClick={manejarEdicion}>Editar Perfil</button>
    </div>
  );
};

export default PerfilContenido;

