import React, { useState } from 'react';  // Importa React y el hook useState para manejar el estado
import DatePicker from 'react-datepicker';  // Importa el componente DatePicker para la selección de fechas
import './BookingForm.css';  // Importa los estilos personalizados desde el archivo BookingForm.css

// Componente funcional de BookingForm
const BookingForm = () => {
  // Definición de estados con el hook useState para gestionar las fechas de Check-In, Check-Out y el número de adultos y niños
  const [checkIn, setCheckIn] = useState(null);  // Estado para la fecha de Check-In, inicialmente null (no seleccionado)
  const [checkOut, setCheckOut] = useState(null);  // Estado para la fecha de Check-Out, inicialmente null (no seleccionado)
  const [adultos, setAdultos] = useState(0);  // Estado para el número de adultos, inicialmente 0
  const [ninos, setNinos] = useState(0);  // Estado para el número de niños, inicialmente 0

  // Función que se ejecuta cuando el usuario hace clic en el botón de búsqueda
  const handleSearch = () => {
    // Imprime en consola los valores actuales de los estados
    console.log('Buscar con:', {
      checkIn,
      checkOut,
      adultos,
      ninos
    });
    // Aquí es donde podrías agregar la lógica para navegar a una nueva página o filtrar las habitaciones
  };

  // El formulario de búsqueda y los campos de entrada de datos
  return (
    <div className="booking-form">  {/* Contenedor principal con la clase de estilo 'booking-form' */}
      {/* Título del formulario, con un estilo específico en la palabra 'Habitaciones' */}
      <h2><strong>Buscar</strong> <span style={{ color: '#e76e50' }}>Habitaciones</span></h2>

      <div className="form-row"> {/* Contenedor para organizar los campos del formulario en una fila */}
        
        {/* Primer campo de entrada: Check-In */}
        <div className="form-group"> {/* Contenedor para el campo de Check-In */}
          <label>Check In</label> {/* Etiqueta para el campo Check-In */}
          {/* Componente DatePicker que permite seleccionar una fecha */}
          <DatePicker
            selected={checkIn}  // Valor actual del estado checkIn
            onChange={(date) => setCheckIn(date)}  // Al cambiar la fecha, se actualiza el estado checkIn
            placeholderText="Agregar fecha"  // Texto que aparece cuando el campo está vacío
            dateFormat="MM/dd/yyyy"  // Formato de la fecha
          />
        </div>

        {/* Segundo campo de entrada: Check-Out */}
        <div className="form-group"> {/* Contenedor para el campo de Check-Out */}
          <label>Check Out</label> {/* Etiqueta para el campo Check-Out */}
          {/* Componente DatePicker para seleccionar la fecha de Check-Out */}
          <DatePicker
            selected={checkOut}  // Valor actual del estado checkOut
            onChange={(date) => setCheckOut(date)}  // Al cambiar la fecha, se actualiza el estado checkOut
            placeholderText="Agregar fecha"  // Texto de marcador de posición
            dateFormat="MM/dd/yyyy"  // Formato de la fecha
          />
        </div>

        {/* Tercer campo de entrada: Número de adultos */}
        <div className="form-group"> {/* Contenedor para el campo de adultos */}
          <label>Adultos</label> {/* Etiqueta para el campo de adultos */}
          {/* Campo de entrada para el número de adultos */}
          <input
            type="number"  // El tipo de entrada es un número
            value={adultos}  // El valor es el estado 'adultos'
            min={0}  // El valor mínimo permitido es 0
            max={10}  // El valor máximo permitido es 10
            onChange={(e) => setAdultos(Math.min(Number(e.target.value), 10))}  // Al cambiar el valor, actualiza el estado, limitando el máximo a 10
          />
        </div>

        {/* Cuarto campo de entrada: Número de niños */}
        <div className="form-group"> {/* Contenedor para el campo de niños */}
          <label>Niños</label> {/* Etiqueta para el campo de niños */}
          {/* Campo de entrada para el número de niños */}
          <input
            type="number"  // El tipo de entrada es un número
            value={ninos}  // El valor es el estado 'ninos'
            min={0}  // El valor mínimo permitido es 0
            max={10}  // El valor máximo permitido es 10
            onChange={(e) => setNinos(Math.min(Number(e.target.value), 10))}  // Al cambiar el valor, actualiza el estado, limitando el máximo a 10
          />
        </div>

        {/* Botón de búsqueda */}
        <div className="form-group search-btn"> {/* Contenedor para el botón */}
          {/* Botón con un ícono de lupa para realizar la búsqueda */}
          <button onClick={handleSearch}>🔍</button> {/* Al hacer clic en el botón, se ejecuta la función handleSearch */}
        </div>
      </div>
    </div>
  );
};

// Exportación del componente para su uso en otros archivos
export default BookingForm;
