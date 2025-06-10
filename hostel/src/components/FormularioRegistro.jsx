import React from 'react';
import './FormularioRegistro.css';

const FormularioRegistro = ({ onClose }) => {
  return (
    <div className="modal">
      <div className="modal-content formulario-registro">
        <button className="cerrar" onClick={onClose}>✕</button>
        <h3>Regístrate</h3>

        <form>
          <div className="entrada-doble">
            <select>
              <option>ECU (+593)</option>
              <option>PER (+51)</option>
              <option>COL (+57)</option>
            </select>
            <input type="text" placeholder="Ingrese su número" />
          </div>

          <input type="email" placeholder="Ingrese su correo" />
          <input type="text" placeholder="Ingrese su nombre" />
          <input type="password" placeholder="Ingrese su contraseña" />

          <button type="submit" className="btn-continuar">Continuar</button>
        </form>
      </div>
    </div>
  );
};

export default FormularioRegistro;
