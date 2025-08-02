import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './FormularioLogin.css';
import FormularioRecuperar from './FormularioRecuperar';
import authService from '../services/authService';

const FormularioLogin = ({ onClose }) => {
  const [mostrarRecuperar, setMostrarRecuperar] = useState(false);
  const [correo, setCorreo] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate();

  // Expresión regular para validar formato de correo
  const correoValido = (correo) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo);

  const manejarLogin = async () => {
    // Validaciones antes de consultar el servidor
    if (!correo || !contrasena) {
      setError('Todos los campos son obligatorios');
      return;
    }

    if (!correoValido(correo)) {
      setError('Formato de correo inválido');
      return;
    }

    try {
      // Usar el servicio de autenticación JWT
      const response = await authService.login({
        correo: correo,
        contrasena: contrasena
      });

      // Login exitoso - cerrar modal y redirigir
      onClose();
      
      const usuario = response.persona;
      navigate(usuario.tipo === 'admin' ? '/admin/perfil' : '/perfil');
      
    } catch (error) {
      console.error(error);
      // Manejar diferentes tipos de errores
      if (error.error) {
        setError(error.error);
      } else if (error.message) {
        setError(error.message);
      } else {
        setError('Las credenciales están mal ingresadas');
      }
    }
  };

  return (
    <>
      {!mostrarRecuperar ? (
        <div className="modal-overlay">
          <div className="modal-content">
            <button className="close-btn" onClick={onClose}>✕</button>
            <h3>Iniciar Sesión</h3>

            <input
              type="email"
              placeholder="Ingrese su correo"
              value={correo}
              onChange={(e) => setCorreo(e.target.value)}
            />
            <input
              type="password"
              placeholder="Ingrese su contraseña"
              value={contrasena}
              onChange={(e) => setContrasena(e.target.value)}
            />

            {error && <p className="error-msg">{error}</p>}

            <p className="link" onClick={() => setMostrarRecuperar(true)}>
              ¿Olvidaste tu contraseña?
            </p>

            <button className="btn-principal" onClick={manejarLogin}>Ingresar</button>
          </div>
        </div>
      ) : (
        <FormularioRecuperar onClose={() => setMostrarRecuperar(false)} />
      )}
    </>
  );
};

export default FormularioLogin;