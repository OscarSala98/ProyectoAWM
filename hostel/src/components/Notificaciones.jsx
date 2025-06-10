import React, { useState } from 'react';
import './Notificaciones.css';

const Notificaciones = () => {
  const [notificaciones, setNotificaciones] = useState([
    { id: 1, texto: 'Nueva alerta de reserva', fecha: '12 Mar 2021' },
    { id: 2, texto: 'Tu reserva a sido rechazada', fecha: '12 Mar 2021' },
    { id: 3, texto: 'Perfil actualizado', fecha: '12 Mar 2021' },
    { id: 4, texto: 'Nuevo mensaje de HostelNovel', fecha: '12 Mar 2021' },
  ]);

  const eliminarNotificacion = (id) => {
    setNotificaciones(notificaciones.filter(n => n.id !== id));
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
