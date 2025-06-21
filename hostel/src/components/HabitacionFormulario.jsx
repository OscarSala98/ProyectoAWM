import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import FotoUploader from './FotoUploader';
import InfoHabitacion from './InfoHabitacion';
import ServiciosCheckbox from './ServiciosCheckbox';
import './HabitacionFormulario.css';

const HabitacionFormulario = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [datos, setDatos] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`http://localhost:3002/habitaciones/${id}`)
      .then((res) => {
        setDatos(res.data);
        setLoading(false);
      })
      .catch((err) => console.error('Error al obtener datos de la habitación:', err));
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDatos(prev => ({ ...prev, [name]: value }));
  };

  const handleGuardar = () => {
    axios.put(`http://localhost:3002/habitaciones/${id}`, datos)
      .then(() => {
        alert('Cambios guardados correctamente ✅');
        navigate('/admin/editar-habitacion');
      })
      .catch((err) => {
        console.error('Error al guardar los cambios:', err);
        alert('❌ Hubo un error al guardar los cambios');
      });
  };

  if (loading || !datos) return <p>Cargando datos...</p>;

  return (
    <div className="habitacion-formulario">
      <FotoUploader imagenInicial={datos.portada} />
      <div className="formulario-derecha">
        <h2>Información de la habitación</h2>
        <InfoHabitacion datos={datos} onChange={handleChange} />
        <ServiciosCheckbox datos={datos} setDatos={setDatos} />

        <button className="btn-guardar" onClick={handleGuardar}>Guardar</button>
      </div>
    </div>
  );
};

export default HabitacionFormulario;
