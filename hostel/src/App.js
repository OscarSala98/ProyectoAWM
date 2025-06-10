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
import PerfilAdmin from './pages/PerfilAdmin';
import EditarPerfilAdmin from './pages/EditarPerfilAdmin';
import ChatAdmin from './pages/ChatAdmin';
import NotificacionesPageAdmin from './pages/NotificacionesPageAdmin';
import ReservacionesAdmin from './pages/ReservacionesAdmin';
import EditarHabitacion from './pages/EditarHabitacion';

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
        <Route path="/admin/perfil" element={<PerfilAdmin />} />
        <Route path="/admin/editar-perfil" element={<EditarPerfilAdmin />} />
        <Route path="/admin/chat" element={<ChatAdmin />} />
        <Route path="/admin/notificaciones" element={<NotificacionesPageAdmin />} />
        <Route path="/admin/reservaciones" element={<ReservacionesAdmin />} />
        <Route path="/admin/editar-habitacion" element={<EditarHabitacion />} />

        {/* Agrega más rutas según sea necesario */}

      </Routes>
    </BrowserRouter>
  );
}
export default App;	