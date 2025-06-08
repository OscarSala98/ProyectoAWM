import React from 'react'; // Importa React, que es necesario para escribir componentes en JSX.
import { useNavigate } from 'react-router-dom'; // Importa el hook useNavigate de react-router-dom para realizar navegación programática entre rutas.
import './FiltroHabitaciones.css'; // Importa la hoja de estilos personalizada para este componente.

const FiltroHabitaciones = () => { // Definición del componente funcional "FiltroHabitaciones"
  const navigate = useNavigate(); // Inicializa el hook useNavigate, que permite navegar entre las rutas de la aplicación.

  // Función que maneja el clic en los botones de filtro. Recibe el tipo de habitación como argumento.
  const manejarFiltro = (tipo) => {
    // Navega a la ruta '/habitaciones-filtradas' y pasa el tipo de habitación como estado.
    navigate('/habitaciones-filtradas', { state: { tipo } });
  };

  // El componente renderiza los botones para filtrar las habitaciones según su tipo.
  return (
    <div className="filtros-contenedor"> {/* Contenedor principal de los filtros */}
      {/* Botón para filtrar habitaciones de tipo "Simple". Al hacer clic, se llama a manejarFiltro con el tipo 'Simple'. */}
      <button onClick={() => manejarFiltro('Simple')}>Habitación Simple</button>
      
      {/* Separador visual entre los botones, usando un punto (•) */}
      <span className="punto">•</span>
      
      {/* Botón para filtrar habitaciones de tipo "Doble". Al hacer clic, se llama a manejarFiltro con el tipo 'Doble'. */}
      <button onClick={() => manejarFiltro('Doble')}>Habitación Doble</button>
      
      {/* Separador visual entre los botones */}
      <span className="punto">•</span>
      
      {/* Botón para filtrar habitaciones de tipo "Delux". Al hacer clic, se llama a manejarFiltro con el tipo 'Delux'. */}
      <button onClick={() => manejarFiltro('Delux')}>Habitación Delux</button>
    </div>
  );
};

// Exportación del componente para su uso en otros archivos
export default FiltroHabitaciones;
