import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Notificaciones from '../components/Notificaciones';
import './NotificacionesPage.css';

const NotificacionesPageAdmin = () => {
  const navigate = useNavigate();

  return (
    <div className="page-layout">
      <div className="page-content">
        <Header />
        <div className="notificaciones-page-container">
          <button className="btn-atras" onClick={() => navigate(-1)}>Atrás</button>
          <Notificaciones />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default NotificacionesPageAdmin;
