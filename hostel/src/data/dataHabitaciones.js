// src/data/dataHabitaciones.js

import imgSimple from '../assets/HS103.webp';
import imgDoble from '../assets/HD103.webp';
import imgDelux from '../assets/HDE302.webp';

const habitaciones = [
  {
    id: 'HS103',
    titulo: 'Habitación Simple 103',
    tipo: 'Simple',
    precio: '$1000 - $5000 USD',
    descripcion: '2 Plazas',
    imagen: imgSimple,
    camas: 1,
    banos: 1,
    parqueo: 1,
    mascotas: 0,
    precioDesglose: {
      corto: '$1000',
      medio: '$3000',
      largo: '$5000'
    },
    amenities: ['Alimentación', 'Smart TV', 'Aire Acondicionado', 'Wifi']
  },
  {
    id: 'HS102',
    titulo: 'Habitación Simple 102',
    tipo: 'Simple',
    precio: '$1000 - $5000 USD',
    descripcion: '2 Plazas',
    imagen: imgSimple,
    camas: 1,
    banos: 1,
    parqueo: 1,
    mascotas: 0,
    precioDesglose: {
      corto: '$1000',
      medio: '$3000',
      largo: '$5000'
    },
    amenities: ['Wifi', 'Vista al Patio']
  },
  {
    id: 'HD103',
    titulo: 'Habitación Doble 103',
    tipo: 'Doble',
    precio: '$1000 - $5000 USD',
    descripcion: '2 Plazas y 1½ Plazas',
    imagen: imgDoble,
    camas: 2,
    banos: 1,
    parqueo: 1,
    mascotas: 1,
    precioDesglose: {
      corto: '$1000',
      medio: '$3500',
      largo: '$5000'
    },
    amenities: ['Smart TV', 'Wifi']
  },
  {
    id: 'HD304',
    titulo: 'Habitación Doble 304',
    tipo: 'Doble',
    precio: '$1000 - $5000 USD',
    descripcion: '2 Plazas y 1½ Plazas',
    imagen: imgDoble,
    camas: 2,
    banos: 1,
    parqueo: 1,
    mascotas: 1,
    precioDesglose: {
      corto: '$1000',
      medio: '$3500',
      largo: '$5000'
    },
    amenities: ['Alimentación', 'Aire Acondicionado']
  },
  {
    id: 'HDE302',
    titulo: 'Habitación Delux 302',
    tipo: 'Delux',
    precio: '$1000 - $5000 USD',
    descripcion: '3 Plazas y Yacuzzi',
    imagen: imgDelux,
    camas: 3,
    banos: 2,
    parqueo: 2,
    mascotas: 1,
    precioDesglose: {
      corto: '$1000',
      medio: '$4000',
      largo: '$5000'
    },
    amenities: ['Aire Acondicionado', 'Vista al Patio', 'Smart TV']
  }
];

export default habitaciones;
