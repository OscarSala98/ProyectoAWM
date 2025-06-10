import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Habitaciones from './pages/Habitaciones';
import HabitacionesFiltradas from './pages/HabitacionesFiltradas';
import HabitacionDetalle from './pages/HabitacionDetalle';
import Reservas from './pages/Reservas';

import 'react-datepicker/dist/react-datepicker.css';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/habitaciones" element={<Habitaciones />} />
        <Route path="/habitaciones-filtradas" element={<HabitacionesFiltradas />} />
        <Route path="/habitacion/:id" element={<HabitacionDetalle />} />
        <Route path="/reservas" element={<Reservas />} />
        {/* Agrega más rutas según sea necesario */}

      </Routes>
    </BrowserRouter>
  );
}
export default App;	