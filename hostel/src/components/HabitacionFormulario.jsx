import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import FotoUploader from './FotoUploader';
import InfoHabitacion from './InfoHabitacion';
import ServiciosCheckbox from './ServiciosCheckbox';
import ModalConfirmacion from './ModalConfirmacion'; // ✅ Importar
import './HabitacionFormulario.css';

const HabitacionFormulario = ({ esNuevo = false }) => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [datos, setDatos] = useState({
    id_habitacion: '',
    tipo: '',
    descripcion: '',
    precio: '',
    precioDesglose: { corto: '', largo: '', media: '' },
    camas: 1,
    banos: 1,
    parqueo: 1,
    mascotas: 0,
    servicios: [],
    portada: ''
  });

  const [loading, setLoading] = useState(!esNuevo);

  const [modalVisible, setModalVisible] = useState(false); // ✅
  const [modalMensaje, setModalMensaje] = useState(''); // ✅

  useEffect(() => {
    if (!esNuevo && id) {
      axios.get(`http://localhost:3002/habitaciones/${id}`)
        .then((res) => {
          setDatos(res.data);
          setLoading(false);
        })
        .catch((err) => console.error('Error al obtener datos de la habitación:', err));
    }
  }, [id, esNuevo]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDatos(prev => ({ ...prev, [name]: value }));
  };

  const handleGuardar = async () => {
    const idFinal = datos.id_habitacion;

    if (!idFinal) {
      alert('❌ El campo "ID Habitación" es obligatorio');
      return;
    }

    if (esNuevo) {
      try {
        await axios.post('http://localhost:3002/habitaciones', datos);
        setModalMensaje('Habitación creada exitosamente ✅'); // ✅
        setModalVisible(true); // ✅
      } catch (err) {
        console.error('Error al crear habitación:', err);
        alert('❌ Error al crear la habitación');
      }
    } else {
      try {
        await axios.put(`http://localhost:3002/habitaciones/${id}`, datos);
        setModalMensaje('Cambios guardados correctamente ✅'); // ✅
        setModalVisible(true); // ✅
      } catch (err) {
        console.error('Error al guardar los cambios:', err);
        alert('❌ Hubo un error al guardar los cambios');
      }
    }
  };

  const handleCerrarModal = () => {
    setModalVisible(false);
    navigate('/admin/editar-habitacion', { state: { actualizar: true } }); // ✅ redirigir desde el modal
  };

  if (loading) return <p>Cargando datos...</p>;

  return (
    <div className="habitacion-formulario">
      <FotoUploader idHabitacion={datos.id_habitacion} />
      <div className="formulario-derecha">
        <h2>{esNuevo ? 'Nueva Habitación' : 'Editar Habitación'}</h2>
        <InfoHabitacion datos={datos} onChange={handleChange} />
        <ServiciosCheckbox datos={datos} setDatos={setDatos} />
        <button className="btn-guardar" onClick={handleGuardar}>
          {esNuevo ? 'Crear' : 'Guardar'}
        </button>
      </div>

      <ModalConfirmacion
        visible={modalVisible}
        mensaje={modalMensaje}
        onClose={handleCerrarModal}
      />
    </div>
  );
};

export default HabitacionFormulario;
