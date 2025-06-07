import React from 'react';
import './Footer.css';
import logoVertical from '../assets/logo.webp';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-logo">
        <img src={logoVertical} alt="Grupo Novel" />
      </div>
      <div className="footer-info">
        <h4>CONTACTOS DE INFORMACIÓN</h4>
        <p>Teléfono: 593 - 0995639172</p>
        <p>Email: info@hostelnovel.com</p>
        <p>Dirección: Av. París y Av. Tómas de Berlanga</p>
      </div>
      <div className="footer-icons">
        <FaFacebookF />
        <FaTwitter />
        <FaInstagram />
        <FaLinkedinIn />
      </div>
    </footer>
  );
};

export default Footer;
