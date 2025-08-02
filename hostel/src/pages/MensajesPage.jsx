import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import MensajesNuevo from '../components/MensajesNuevo';
import ProtectedRoute from '../components/ProtectedRoute';

const MensajesPage = () => {
  return (
    <ProtectedRoute>
      <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <Header />
        <main style={{ flex: 1, padding: '20px', backgroundColor: '#f8f9fa' }}>
          <div className="container">
            <h1 style={{ textAlign: 'center', marginBottom: '20px' }}>Mensajes</h1>
            <MensajesNuevo />
          </div>
        </main>
        <Footer />
      </div>
    </ProtectedRoute>
  );
};

export default MensajesPage;
