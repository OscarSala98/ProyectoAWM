import React from 'react';
import './PerfilContenido.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const PerfilContenido = ({ usuario }) => {
  const navigate = useNavigate();

  const manejarEdicion = () => {
    navigate(usuario.tipo === 'admin' ? '/admin/editar-perfil' : '/editar-perfil');
  };

  const manejarEliminacion = async () => {
    const confirmacion = window.confirm('¿Estás seguro de que deseas eliminar tu cuenta? Esta acción no se puede deshacer.');

    if (confirmacion) {
      try {
        await axios.delete(`http://localhost:3002/personas/${usuario.id}`);
        localStorage.removeItem('usuario');
        alert('Cuenta eliminada correctamente.');
        navigate('/'); // Redirige al inicio
      } catch (error) {
        console.error('Error al eliminar la cuenta:', error);
        alert('❌ Ocurrió un error al intentar eliminar la cuenta.');
      }
    }
  };

  if (!usuario) return null;

  return (
    <div className="perfil-contenido">
      <h2>Hola, {usuario.primerNombre}</h2>

      <div className="perfil-detalles">
        <p><strong>Nombre completo:</strong> {usuario.primerNombre} {usuario.segundoNombre} {usuario.primerApellido}</p>
        <p><strong>Correo:</strong> {usuario.correo}</p>
        <p><strong>Teléfono:</strong> {usuario.numero}</p>
        <p><strong>Rol:</strong> {usuario.tipo}</p>
      </div>

      <button className="btn-editar" onClick={manejarEdicion}>Editar Perfil</button>
      <br />
      <button className="btn-eliminar" onClick={manejarEliminacion}>Eliminar Cuenta</button>
    </div>
  );
};

export default PerfilContenido;
