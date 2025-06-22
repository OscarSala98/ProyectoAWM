import React from 'react';
import './FotoUploader.css';

const FotoUploader = ({ idHabitacion }) => {
  const rutaImagen = `/Habitaciones/${idHabitacion}/${idHabitacion}.webp`;

  const [preview, setPreview] = React.useState(rutaImagen);

  const handleImageChange = (e) => {
    const file = e.target.files[0]; //
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);// Convertir a base64 para mostrar la imagen
      };
      reader.readAsDataURL(file);// Leer el archivo como URL de datos
    }
  };

  return (
    <div className="foto-uploader-contenedor">
      <div className="foto-uploader-item">
        <label>PORTADA</label>
        <img
          src={preview}
          alt="portada"
          className="foto-uploader-preview"
          onError={(e) => e.target.style.display = 'none'}
        />
        <input
          type="file"
          accept="image/*"
          id="foto-upload-input"
          style={{ display: 'none' }}
          onChange={handleImageChange}
        />
        <label htmlFor="foto-upload-input" className="foto-uploader-boton">
          Subir foto
        </label>
      </div>
    </div>
  );
};

export default FotoUploader;
