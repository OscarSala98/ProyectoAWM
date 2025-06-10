import React, { useState } from 'react';
import './FormularioRecuperar.css';
import ModalConfirmacion from './ModalConfirmacion';

const FormularioRecuperar = ({ onClose }) => {
  const [exito, setExito] = useState(false);

  const manejarEnvio = () => {
    setExito(true);
  };

const [correo, setCorreo] = useState('');

const [error, setError] = useState('');

const handleEnviar = () => {
    if (!correo.trim()) {
        setError('Se requiere el correo');
        return;
    }
    setError('');
    manejarEnvio();
};

return (
    <>
        <div className="modal-overlay">
            <div className="modal-content">
                <button className="close-btn" onClick={onClose}>✕</button>
                <h3>Ingrese su Correo</h3>

                <input
                    type="email"
                    placeholder="Correo electrónico"
                    value={correo}
                    onChange={e => {
                        setCorreo(e.target.value);
                        setError('');
                    }}
                />
                {error && <p className="error">{error}</p>}

                <p className="nota">En tu correo se te enviará tu contraseña</p>

                <button
                    className="btn-principal"
                    onClick={handleEnviar}
                >
                    Enviar
                </button>
            </div>
        </div>

        <ModalConfirmacion
            visible={exito}
            onClose={() => {
                setExito(false);
                onClose(); // cierra ambos
            }}
            mensaje="Revisa tu correo"
            boton="Cerrar"
        />
    </>
);
};

export default FormularioRecuperar;
