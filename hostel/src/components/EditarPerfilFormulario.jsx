import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import ModalConfirmacion from './ModalConfirmacion';
import './EditarPerfilFormulario.css';

const EditarPerfilFormulario = () => {
  const navigate = useNavigate();
  const usuarioLocal = JSON.parse(localStorage.getItem('usuario'));

  const [persona, setpersona] = useState({
    primerNombre: '',
    segundoNombre: '',
    primerApellido: '',
    numero: '',
    correo: '',
    contrasena: ''
  });

  const [modalVisible, setModalVisible] = useState(false);

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
  }, []);

  const handleChange = (e) => {
    setpersona({ ...persona, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.put(`http://localhost:3002/personas/${usuarioLocal.id}`, {
      ...usuarioLocal,
      ...persona
    })
    .then(() => {
      const usuarioActualizado = { ...usuarioLocal, ...persona };
      localStorage.setItem('usuario', JSON.stringify(usuarioActualizado));
      setModalVisible(true);
    })
    .catch((error) => {
      console.error('Error al actualizar perfil:', error);
      alert('❌ Hubo un error al guardar los cambios');
    });
  };

  const handleCerrarModal = () => {
    setModalVisible(false);
    navigate(-1); // ← Esto te devuelve a la página anterior
  };

  return (
    <div className="editar-perfil-grid">
      <form className="editar-perfil-formulario" onSubmit={handleSubmit}>
        <h2>Hola, {persona.primerNombre}</h2>

        <div className="formulario-dos-columnas">
          <div>
            <label>Primer Nombre</label>
            <input type="text" name="primerNombre" value={persona.primerNombre} onChange={handleChange} required />
          </div>
          <div>
            <label>Segundo Nombre</label>
            <input type="text" name="segundoNombre" value={persona.segundoNombre} onChange={handleChange} />
          </div>
        </div>

        <div className="formulario-dos-columnas">
          <div>
            <label>Primer Apellido</label>
            <input type="text" name="primerApellido" value={persona.primerApellido} onChange={handleChange} required />
          </div>
          <div>
            <label>Número de teléfono</label>
            <input type="text" name="numero" value={persona.numero} onChange={handleChange} required />
          </div>
        </div>

        <div className="formulario-una-columna">
          <label>Correo Electrónico</label>
          <input type="email" name="correo" value={persona.correo} onChange={handleChange} required />
        </div>

        <div className="formulario-una-columna">
          <label>Nueva Contraseña</label>
          <input type="password" name="contrasena" value={persona.contrasena} onChange={handleChange} required />
        </div>

        <button type="submit" className="btn-guardar">Guardar</button>
      </form>

      <ModalConfirmacion
        mensaje="Perfil actualizado correctamente ✅"
        visible={modalVisible}
        onClose={handleCerrarModal}
      />
    </div>
  );
};

export default EditarPerfilFormulario;
