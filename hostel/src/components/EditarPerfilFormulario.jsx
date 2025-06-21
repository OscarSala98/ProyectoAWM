import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import ModalConfirmacion from './ModalConfirmacion';
import './EditarPerfilFormulario.css';

const EditarPerfilFormulario = () => {
  const navigate = useNavigate();
  const usuarioLocal = JSON.parse(localStorage.getItem('usuario'));

  const [modalVisible, setModalVisible] = useState(false);
  const [prefijo, setPrefijo] = useState('+593');

  const [persona, setPersona] = useState({
    primerNombre: '',
    segundoNombre: '',
    primerApellido: '',
    numero: '',
    correo: '',
    contrasena: ''
  });
// eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    const usuarioLocal = JSON.parse(localStorage.getItem('usuario'));
    if (usuarioLocal) {
      // Separar prefijo si el número lo contiene
      const numeroCompleto = usuarioLocal.numero || '';
      const posiblesPrefijos = ['+593', '+7', '+21'];
      const encontrado = posiblesPrefijos.find((p) => numeroCompleto.startsWith(p)) || '+593';
      const numeroSinPrefijo = numeroCompleto.replace(encontrado, '');

      setPrefijo(encontrado);
      setPersona({
        primerNombre: usuarioLocal.primerNombre || '',
        segundoNombre: usuarioLocal.segundoNombre || '',
        primerApellido: usuarioLocal.primerApellido || '',
        numero: numeroSinPrefijo,
        correo: usuarioLocal.correo || '',
        contrasena: usuarioLocal.contrasena || ''
      });
    }
  }, []);

  const handleChange = (e) => {
    setPersona({ ...persona, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    

    const datosActualizados = {
      ...usuarioLocal,
      ...persona,
      numero: prefijo + persona.numero, // combina prefijo + número
      prefijo: prefijo // asegúrate de actualizar también el campo prefijo
    };

    axios.put(`http://localhost:3002/personas/${usuarioLocal.id}`, datosActualizados)
      .then(() => {
        localStorage.setItem('usuario', JSON.stringify(datosActualizados));
        setModalVisible(true);
      })
      .catch((error) => {
        console.error('Error al actualizar perfil:', error);
        alert('❌ Hubo un error al guardar los cambios');
      });
  };


  const handleCerrarModal = () => {
    setModalVisible(false);
    navigate(-1);
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
              pattern="^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$"
              title="Solo letras"
            />
          </div>
          <div>
            <label>Segundo Nombre</label>
            <input
              type="text"
              name="segundoNombre"
              value={persona.segundoNombre}
              onChange={handleChange}
              pattern="^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$"
              title="Solo letras"
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
              pattern="^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$"
              title="Solo letras"
            />
          </div>
          <div>
            <label>Teléfono</label>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <select value={prefijo} onChange={(e) => setPrefijo(e.target.value)} required>
                <option value="+593">+593</option>
                <option value="+7">+7</option>
                <option value="+21">+21</option>
              </select>
              <input
                type="text"
                name="numero"
                placeholder="1234567890"
                value={persona.numero}
                onChange={(e) => {
                  const soloNumeros = e.target.value.replace(/\D/g, '');
                  if (soloNumeros.length <= 10) {
                    setPersona({ ...persona, numero: soloNumeros });
                  }
                }}
                pattern="\d{7,10}"
                title="Debe tener entre 7 y 10 dígitos"
                required
              />
            </div>
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
            pattern="^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$"
            title="Formato de correo inválido"
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

      <ModalConfirmacion
        mensaje="Perfil actualizado correctamente ✅"
        visible={modalVisible}
        onClose={handleCerrarModal}
      />
    </div>
  );
};

export default EditarPerfilFormulario;
