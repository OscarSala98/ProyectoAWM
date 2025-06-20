import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './EditarPerfilFormulario.css';

const EditarPerfilFormulario = () => {
  const usuarioLocal = JSON.parse(localStorage.getItem('usuario'));
  const [persona, setpersona] = useState({
    primerNombre: '',
    segundoNombre: '',
    primerApellido: '',
    numero: '',
    correo: '',
    contrasena: ''
  });

  useEffect(() => {
  if (usuarioLocal) {
    setpersona({
      primerNombre: usuarioLocal.primerNombre || '',
      segundoNombre: usuarioLocal.segundoNombre || '',
      primerApellido: usuarioLocal.primerApellido || '',
      numero: usuarioLocal.numero || '',
      correo: usuarioLocal.correo || '',
      contrasena: usuarioLocal.contrasena || ''
    });
  }
}, []); // ← SIN dependencias


  const handleChange = (e) => {
    setpersona({...persona, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      console.log("Usuario:", usuarioLocal);

      await axios.put(`http://localhost:3002/personas/${usuarioLocal.id}`, {
        ...usuarioLocal,
        ...persona
      });

      // Actualizar localStorage
      const usuarioActualizado = { ...usuarioLocal, ...persona };
      localStorage.setItem('usuario', JSON.stringify(usuarioActualizado));

      alert('Perfil actualizado correctamente ✅');
    } catch (error) {
      console.error('Error al actualizar perfil:', error);
      alert('❌ Hubo un error al guardar los cambios');
    }
  };

  return (
    <div className="editar-perfil-grid">
      <form className="editar-perfil-formulario" onSubmit={handleSubmit}>
        <h2>Hola, {persona.primerNombre}</h2>

        <div className="formulario-dos-columnas">
          <div>
            <label>Primer Nombre</label>
            <input
              type="text"
              name="primerNombre"
              value={persona.primerNombre}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>Segundo Nombre</label>
            <input
              type="text"
              name="segundoNombre"
              value={persona.segundoNombre}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="formulario-dos-columnas">
          <div>
            <label>Primer Apellido</label>
            <input
              type="text"
              name="primerApellido"
              value={persona.primerApellido}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>Número de teléfono</label>
            <input
              type="text"
              name="numero"
              value={persona.numero}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="formulario-una-columna">
          <label>Correo Electrónico</label>
          <input
            type="email"
            name="correo"
            value={persona.correo}
            onChange={handleChange}
            required
          />
        </div>

        <div className="formulario-una-columna">
          <label>Nueva Contraseña</label>
          <input
            type="password"
            name="contrasena"
            value={persona.contrasena}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" className="btn-guardar">Guardar</button>
      </form>
    </div>
  );
};

export default EditarPerfilFormulario;
