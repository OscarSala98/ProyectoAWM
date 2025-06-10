import React from 'react';
import './PerfilSidebar.css';
import { FaUserCircle } from 'react-icons/fa';

const PerfilSidebar = ({ nombre }) => {
  return (
    <aside className="perfil-sidebar">
      <FaUserCircle className="perfil-icono" size={80} />
      <p className="perfil-subtexto">Upload a Photo</p>

      <div className="perfil-verificacion">
        <h4>Verificación de identidad</h4>
        <p>
          Para proteger tu cuenta y brindarte una mejor experiencia, es importante que verifiques tu identidad.
          Asegúrate de tener un correo y número móvil confirmados.
        </p>
      </div>

      <h3 className="perfil-nombre">{nombre}</h3>
    </aside>
  );
};

export default PerfilSidebar;
