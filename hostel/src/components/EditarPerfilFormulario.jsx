// src/components/EditarPerfilFormulario.jsx
import React from 'react';
import './EditarPerfilFormulario.css';

const EditarPerfilFormulario = ({ nombre }) => {
  return (
    <div className="editar-perfil-grid">
      {/* Formulario de la derecha */}
      <form className="editar-perfil-formulario">
        <h2>Hola, {nombre}</h2>

        <div className="formulario-dos-columnas">
          <div>
            <label>Primer Nombre</label>
            <input type="text" placeholder="Primer Nombre" />
          </div>
          <div>
            <label>Segundo Nombre</label>
            <input type="text" placeholder="Segundo Nombre" />
          </div>
        </div>

        <div className="formulario-dos-columnas">
          <div>
            <label>Primer Apellido</label>
            <input type="text" placeholder="Primer Apellido" />
          </div>
          <div>
            <label>Número de teléfono</label>
            <input type="text" placeholder="Número de teléfono" />
          </div>
        </div>

        <div className="formulario-una-columna">
          <label>Correo Electrónico</label>
          <input type="email" placeholder="Correo Electrónico" />
        </div>

        <div className="formulario-una-columna">
          <label>Nueva Contraseña</label>
          <input type="password" placeholder="Nueva Contraseña" />
        </div>

        <button type="submit" className="btn-guardar">Guardar</button>
      </form>
    </div>
  );
};

export default EditarPerfilFormulario;
