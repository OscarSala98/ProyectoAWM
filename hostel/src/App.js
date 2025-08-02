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
import NotificacionesPageAdmin from './pages/NotificacionesPageAdmin';
import ReservacionesAdmin from './pages/ReservacionesAdmin';
import EditarHabitacion from './pages/EditarHabitacion';
import ChatAdmin from './pages/ChatAdmin';
import Unauthorized from './pages/Unauthorized';
import ProtectedRoute from './components/ProtectedRoute';

import 'react-datepicker/dist/react-datepicker.css';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Rutas públicas */}
        <Route path="/" element={<Home />} />
        <Route path="/habitaciones" element={<Habitaciones />} />
        <Route path="/habitaciones-filtradas" element={<HabitacionesFiltradas />} />
        <Route path="/habitacion/:id" element={<HabitacionDetalle />} />
        <Route path="/unauthorized" element={<Unauthorized />} />

        {/* Rutas protegidas para usuarios autenticados */}
        <Route path="/reservas" element={
          <ProtectedRoute>
            <Reservas />
          </ProtectedRoute>
        } />
        
        <Route path="/perfil" element={
          <ProtectedRoute>
            <PerfilUsuario />
          </ProtectedRoute>
        } />
        
        <Route path="/editar-perfil" element={
          <ProtectedRoute>
            <EditarPerfil />
          </ProtectedRoute>
        } />
        
        <Route path="/chat/:id" element={
          <ProtectedRoute>
            <Chat />
          </ProtectedRoute>
        } />
        
        <Route path="/notificaciones" element={
          <ProtectedRoute>
            <NotificacionesPage />
          </ProtectedRoute>
        } />
        
        <Route path="/mis-reservas" element={
          <ProtectedRoute>
            <MisReservas />
          </ProtectedRoute>
        } />

        {/* Rutas protegidas solo para administradores */}
        <Route path="/admin/perfil" element={
          <ProtectedRoute requiredRole="admin">
            <PerfilAdmin />
          </ProtectedRoute>
        } />
        
        <Route path="/admin/editar-perfil" element={
          <ProtectedRoute requiredRole="admin">
            <EditarPerfilAdmin />
          </ProtectedRoute>
        } />
        
        <Route path="/admin/chat/:id" element={
          <ProtectedRoute requiredRole="admin">
            <ChatAdmin />
          </ProtectedRoute>
        } />
        
        <Route path="/admin/notificaciones" element={
          <ProtectedRoute requiredRole="admin">
            <NotificacionesPageAdmin />
          </ProtectedRoute>
        } />
        
        <Route path="/admin/reservaciones" element={
          <ProtectedRoute requiredRole="admin">
            <ReservacionesAdmin />
          </ProtectedRoute>
        } />
        
        <Route path="/admin/editar-habitacion" element={
          <ProtectedRoute requiredRole="admin">
            <EditarHabitacion />
          </ProtectedRoute>
        } />
        
        <Route path="/admin/editar-habitacion/:id" element={
          <ProtectedRoute requiredRole="admin">
            <EditarHabitacion />
          </ProtectedRoute>
        } />
      </Routes>
    </BrowserRouter>
  );
}
export default App;	