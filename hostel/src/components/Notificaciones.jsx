import React from 'react';
import './Notificaciones.css';
import { useNotificaciones } from '../hooks/useNotificaciones';

const Notificaciones = () => {
  const {
    notificaciones,
    notificacionesSinLeer,
    cargando,
    cargarNotificaciones,
    marcarComoLeida,
    eliminarNotificacion
  } = useNotificaciones();

  // Obtener el icono según el tipo
  const obtenerIconoTipo = (tipo) => {
    switch (tipo) {
      case 'mensaje':
        return '💬';
      case 'reserva':
        return '📅';
      case 'sistema':
        return '⚙️';
      default:
        return '📢';
    }
  };

  if (cargando) {
    return <div className="notificaciones-container">Cargando notificaciones...</div>;
  }

  return (
    <div className="notificaciones-container">
      <div className="notificaciones-header">
        <h3>
          Notificaciones 
          {notificacionesSinLeer > 0 && (
            <span className="badge-sin-leer">{notificacionesSinLeer}</span>
          )}
        </h3>
        <button 
          className="btn-recargar" 
          onClick={cargarNotificaciones}
          title="Recargar notificaciones"
        >
          🔄
        </button>
      </div>

      {notificaciones.length === 0 ? (
        <div className="sin-notificaciones">
          <p>No tienes notificaciones</p>
        </div>
      ) : (
        <ul className="notificaciones-lista">
          {notificaciones.map((notif) => (
            <li 
              key={notif.id} 
              className={`notificacion-item ${notif.estado === 'sin leer' ? 'sin-leer' : 'leida'}`}
            >
              <div className="notificacion-icono">
                {obtenerIconoTipo(notif.tipo)}
              </div>
              
              <div className="notificacion-contenido">
                <div className="notificacion-titulo">
                  <strong>{notif.titulo}</strong>
                  <span className="notificacion-tipo">{notif.tipo}</span>
                </div>
                <p className="notificacion-fecha">
                  {new Date(notif.fecha).toLocaleString()}
                </p>
              </div>

              <div className="notificacion-acciones">
                {notif.estado === 'sin leer' && (
                  <button 
                    className="btn-marcar-leida" 
                    onClick={() => marcarComoLeida(notif.id)}
                    title="Marcar como leída"
                  >
                    👁️
                  </button>
                )}
                <button 
                  className="btn-eliminar" 
                  onClick={() => eliminarNotificacion(notif.id)}
                  title="Eliminar notificación"
                >
                  🗑️
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Notificaciones;
