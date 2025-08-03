import React from 'react';
import { useNotificaciones } from '../hooks/useNotificaciones';
import './NotificacionesBadge.css';

const NotificacionesBadge = ({ onClick }) => {
  const { notificacionesSinLeer } = useNotificaciones();

  return (
    <div className="notificaciones-badge-container" onClick={onClick}>
      <span className="notificaciones-icono">🔔</span>
      {notificacionesSinLeer > 0 && (
        <span className="notificaciones-contador">
          {notificacionesSinLeer > 99 ? '99+' : notificacionesSinLeer}
        </span>
      )}
    </div>
  );
};

export default NotificacionesBadge;
