import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Notificaciones.css';

const API_URL = 'http://localhost:3002/api/notificaciones';

const Notificaciones = () => {
  const [notificaciones, setNotificaciones] = useState([]);

  // GET: Cargar notificaciones
  useEffect(() => {
    axios.get(API_URL)
      .then(res => {
        setNotificaciones(res.data);
      })
      .catch(err => {
        console.error('Error al cargar notificaciones:', err);
      });
  }, []);

  const eliminarNotificacion = (id) => {
  console.log(`Intentando eliminar notificación con ID: ${id}`);
  axios.delete(`${API_URL}/${id}`)
    .then((res) => {
      if (res.status === 200 || res.status === 204) {
        console.log(`Notificación con ID ${id} eliminada`);
        setNotificaciones(notificaciones.filter(n => n.id !== id));
      } else {
        console.error(`Error inesperado: código de estado ${res.status}`);
      }
    })
    .catch((error) => {
      if (error.response) {
        console.error(`Error ${error.response.status}:`, error.response.data);
      } else if (error.request) {
        console.error("No hubo respuesta del servidor:", error.request);
      } else {
        console.error("Error general:", error.message);
      }
    });
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
