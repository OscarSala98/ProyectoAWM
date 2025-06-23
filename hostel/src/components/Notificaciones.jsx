import React, { useState, useEffect } from 'react';
import './Notificaciones.css';

const API_URL = 'http://localhost:3002/notificaciones';

const Notificaciones = () => {
  const [notificaciones, setNotificaciones] = useState([]);

  // GET: cargar notificaciones
  useEffect(() => {
    fetch(API_URL)
      .then(res => res.json())
      .then(data => {
        console.log('Datos cargados:', data);
        setNotificaciones(data);
      })
      .catch(error => console.error('Error al cargar notificaciones:', error));
  }, []);

  // DELETE: eliminar notificación
  const eliminarNotificacion = (id) => {
    console.log(`Eliminando ID: ${id}`);
    fetch(`${API_URL}/${id}`, {
      method: 'DELETE'
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Error al eliminar notificación con ID ${id}`);
        }
        console.log(`Notificación ${id} eliminada correctamente`);
        setNotificaciones(notificaciones.filter(n => n.id !== id));
      })
      .catch(error => console.error('Error al eliminar notificación:', error));
  };

  return (
    <div className="notificaciones-container">
      <div className="notificaciones-header">
        <h3>Todas las notificaciones</h3>
      </div>

      <ul className="notificaciones-lista">
        {notificaciones.map((n) => (
          <li key={n.id} className="notificacion-item">
            <div>
              <strong>{n.texto}</strong>
              <p>{n.fecha}</p>
            </div>
            <button className="btn-cerrar" onClick={() => eliminarNotificacion(n.id)}>✕</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Notificaciones;
