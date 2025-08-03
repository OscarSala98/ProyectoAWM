import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import authService from '../services/authService';
import ModalConfirmacion from './ModalConfirmacion';

const ProtectedRoute = ({ children, requiredRole = null }) => {
  const [mostrarAlerta, setMostrarAlerta] = useState(false);
  const isAuthenticated = authService.isAuthenticated();
  const user = authService.getCurrentUser();

  // Si no está autenticado, mostrar el modal
  if (!isAuthenticated) {
    if (!mostrarAlerta) setMostrarAlerta(true);
    return (
      <>
        <ModalConfirmacion
          mensaje="Debe iniciar sesión para acceder a su perfil."
          visible={mostrarAlerta}
          onClose={() => setMostrarAlerta(false)}
        />
      </>
    );
  }

  // Verificar rol específico si es requerido
  if (requiredRole && user?.tipo !== requiredRole) {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
};

export default ProtectedRoute;