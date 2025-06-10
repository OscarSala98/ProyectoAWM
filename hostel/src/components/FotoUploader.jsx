import React, { useState } from 'react';
import './FotoUploader.css';

const FotoUploader = () => {
  const [imagen, setImagen] = useState(require('../assets/Habitaciones/HD303/HD303.webp'));

  const manejarCambioArchivo = (e) => {
    const archivo = e.target.files[0];
    if (archivo) {
      const urlTemp = URL.createObjectURL(archivo);
      setImagen(urlTemp);
    }
  };

  return (
    <div className="foto-uploader">
      <img src={imagen} alt="Habitación actual" className="foto-uploader-imagen" />
      <label className="foto-uploader-label">
        Upload a Photo
        <input type="file" accept="image/*" onChange={manejarCambioArchivo} hidden />
      </label>
    </div>
  );
};

export default FotoUploader;
