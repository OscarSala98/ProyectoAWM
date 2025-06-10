import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Habitaciones from './pages/Habitaciones';
import HabitacionesFiltradas from './pages/HabitacionesFiltradas';
import HabitacionDetalle from './pages/HabitacionDetalle';
import Reservas from './pages/Reservas';
import PerfilUsuario from './pages/PerfilUsuario';
import EditarPerfil from './pages/EditarPerfil';
import Chat from './pages/Chat';
import NotificacionesPage from './pages/NotificacionesPage';
import MisReservas from './pages/MisReservas';

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
        <Route path="/perfil" element={<PerfilUsuario/>} />
        <Route path="/editar-perfil" element={<EditarPerfil />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/notificaciones" element={<NotificacionesPage />} />
        <Route path="/mis-reservas" element={<MisReservas />} />
        {/* Agrega más rutas según sea necesario */}

      </Routes>
    </BrowserRouter>
  );
}
export default App;	