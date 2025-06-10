import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Mensajes from '../components/Mensajes';
import { useNavigate } from 'react-router-dom';
import './Chat.css';

const ChatAdmin = () => {
  const navigate = useNavigate();

  return (
    <div>
      <Header />

      <div className="chat-container">
        <button className="btn-atras" onClick={() => navigate(-1)}>Atrás</button>
        <Mensajes />
      </div>

      <Footer />
    </div>
  );
};

export default ChatAdmin;
