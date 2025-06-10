// src/data/dataHabitaciones.js

const habitaciones = [
  {
    id: 'HS303',
    titulo: 'Habitación Simple 303',
    tipo: 'Simple',
    precio: '$1000 - $2000',
    descripcion: '2 Plazas',
    descripcionLarga: 'Habitación cómoda ideal para una o dos personas. Cuenta con cama doble, baño privado, escritorio y excelente iluminación natural.',
    camas: 1,
    banos: 1,
    parqueo: 1,
    mascotas: 0,
    precioDesglose: {
      corto: '$1000',
      medio: '$1500',
      largo: '$2000'
    },
    amenities: ['Wifi', 'Smart TV', 'Alimentación'],
    portada: require('../assets/Habitaciones/HS303/HS303.webp')
  },
  {
    id: 'HDE302',
    titulo: 'Habitación Delux 302',
    tipo: 'Delux',
    precio: '$1200 - $2500',
    descripcion: '3 Plazas y Yacuzzi',
    descripcionLarga: 'Esta habitación Delux está equipada con camas amplias, baño privado de lujo, yacuzzi, aire acondicionado y vista al patio.',
    camas: 3,
    banos: 2,
    parqueo: 2,
    mascotas: 1,
    precioDesglose: {
      corto: '$1200',
      medio: '$1800',
      largo: '$2500'
    },
    amenities: ['Vista al Patio', 'Aire Acondicionado', 'Wifi', 'Smart TV'],
    portada: require('../assets/Habitaciones/HDE302/HDE302.webp')
  },
  {
    id: 'HD303',
    titulo: 'Habitación Doble 303',
    tipo: 'Doble',
    precio: '$1100 - $2200',
    descripcion: '2 Plazas y 1½ Plazas',
    descripcionLarga: 'Perfecta para parejas o familias pequeñas, esta habitación doble cuenta con dos camas, buena ventilación y espacio acogedor.',
    camas: 2,
    banos: 1,
    parqueo: 1,
    mascotas: 1,
    precioDesglose: {
      corto: '$1100',
      medio: '$1600',
      largo: '$2200'
    },
    amenities: ['Smart TV', 'Wifi', 'Alimentación'],
    portada: require('../assets/Habitaciones/HD303/HD303.webp')
  }
];

export default habitaciones;
