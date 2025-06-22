const express = require('express');
const cors = require('cors');
const multer = require('multer');
const fs = require('fs');
const path = require('path');

const app = express();
app.use(cors());
app.use(express.static('public'));

// Mapa de sufijos para cada tipo de imagen
const sufijos = {
  portada: '',
  bano: '_bano',
  sala: '_sala',
  cama: '_secundario',
  extra: '_secundario2'
};

// Configuración de almacenamiento de Multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const idHabitacion = req.body.idHabitacion;
    const carpetaDestino = path.join(__dirname, 'public', 'Habitaciones', idHabitacion);

    // Crear la carpeta si no existe
    if (!fs.existsSync(carpetaDestino)) {
      fs.mkdirSync(carpetaDestino, { recursive: true });
    }

    cb(null, carpetaDestino);
  },
  filename: function (req, file, cb) {
    const { idHabitacion, tipo } = req.body;
    const sufijo = sufijos[tipo] || '';
    const nombreArchivo = `${idHabitacion}${sufijo}.webp`;
    cb(null, nombreArchivo);
  }
});

const upload = multer({ storage });

// Ruta para subir imágenes
app.post('/upload', upload.single('foto'), (req, res) => {
  res.json({ mensaje: '✅ Imagen subida correctamente' });
});

// Iniciar servidor
app.listen(3000, () => {
  console.log('Servidor escuchando en http://localhost:3000');
});
