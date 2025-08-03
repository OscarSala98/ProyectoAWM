# 📋 Guía: Cuándo y Cómo Crear Notificaciones

## 🔍 **Notificaciones Automáticas Existentes:**

### ✅ **1. Sistema de Reservas**
- **Al crear reserva nueva** → "Nueva reserva: [Habitación]"
- **Al cambiar estado de reserva** → "Reserva [estado]: [Habitación]"

### ✅ **2. Sistema de Mensajes** (Futuro)
- **Nuevo mensaje recibido** → "Tienes un nuevo mensaje de [usuario]"
- **Conversación iniciada** → "Nueva conversación iniciada"

## 🛠️ **Cómo Agregar Notificaciones en Otros Lugares:**

### **Ejemplo 1: En Login exitoso**
```javascript
// En FormularioLogin.jsx después del login
const notificarLogin = async () => {
  try {
    await axios.post('http://localhost:3002/api/notificaciones', {
      id_usuario: usuarioLogueado.id,
      tipo: "sistema",
      estado: "sin leer",
      titulo: "Bienvenido de vuelta al sistema"
    }, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  } catch (error) {
    console.warn('No se pudo crear notificación de login');
  }
};
```

### **Ejemplo 2: Al registrar nuevo usuario**
```javascript
// En FormularioRegistro.jsx después del registro
const notificarRegistro = async (nuevoUsuario) => {
  try {
    await axios.post('http://localhost:3002/api/notificaciones', {
      id_usuario: nuevoUsuario.id,
      tipo: "sistema", 
      estado: "sin leer",
      titulo: "¡Bienvenido! Tu cuenta ha sido creada exitosamente"
    }, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  } catch (error) {
    console.warn('No se pudo crear notificación de registro');
  }
};
```

### **Ejemplo 3: Notificaciones del sistema**
```javascript
// Para mantenimiento, actualizaciones, etc.
const notificarMantenimiento = async () => {
  // Obtener todos los usuarios activos y notificar
  const usuarios = await obtenerUsuariosActivos();
  
  const promesas = usuarios.map(usuario => 
    axios.post('http://localhost:3002/api/notificaciones', {
      id_usuario: usuario.id,
      tipo: "sistema",
      estado: "sin leer", 
      titulo: "Mantenimiento programado para mañana a las 2:00 AM"
    }, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
  );
  
  await Promise.all(promesas);
};
```

### **Ejemplo 4: Usar el Hook personalizado**
```javascript
import { useNotificaciones } from '../hooks/useNotificaciones';

const MiComponente = () => {
  const { crearNotificacion } = useNotificaciones();
  
  const handleAlgunaAccion = async () => {
    // Tu lógica aquí...
    
    // Crear notificación
    await crearNotificacion({
      id_usuario: usuarioActual.id,
      tipo: "mensaje",
      estado: "sin leer",
      titulo: "Acción completada exitosamente"
    });
  };
};
```

## 🎯 **Lugares Sugeridos para Agregar Notificaciones:**

### **1. Autenticación:**
- ✅ Login exitoso
- ✅ Registro completado  
- ✅ Cambio de contraseña
- ✅ Cierre de sesión por inactividad

### **2. Gestión de Perfil:**
- ✅ Perfil actualizado
- ✅ Foto de perfil cambiada
- ✅ Datos de contacto modificados

### **3. Sistema de Reservas:**
- ✅ **Reserva creada** (ya implementado)
- ✅ **Estado de reserva cambiado** (ya implementado)
- ⭕ Recordatorio de reserva próxima
- ⭕ Reserva cancelada
- ⭕ Solicitud de reembolso

### **4. Sistema de Mensajes:**
- ✅ **Nuevo mensaje recibido** (ya implementado)
- ⭕ Conversación iniciada
- ⭕ Usuario en línea

### **5. Administración:**
- ⭕ Nueva habitación agregada
- ⭕ Precio de habitación actualizado
- ⭕ Usuario nuevo registrado
- ⭕ Reporte semanal/mensual

### **6. Sistema General:**
- ⭕ Mantenimiento programado
- ⭕ Actualizaciones del sistema
- ⭕ Ofertas especiales
- ⭕ Recordatorios importantes

## 📝 **Plantilla para Crear Notificaciones:**

```javascript
const crearNotificacion = async (usuarioId, mensaje, tipo = 'sistema') => {
  try {
    const token = localStorage.getItem('token');
    
    await axios.post('http://localhost:3002/api/notificaciones', {
      id_usuario: usuarioId,
      tipo: tipo,           // "mensaje", "reserva", "sistema"
      estado: "sin leer",
      titulo: mensaje
    }, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
    
    console.log('✅ Notificación creada exitosamente');
  } catch (error) {
    console.warn('⚠️ No se pudo crear la notificación:', error.message);
  }
};
```

## 🔧 **Formatos Actualizados:**

✅ **Formato CORRECTO (actualizado):**
```javascript
{
  "id_usuario": 1,
  "tipo": "reserva",
  "estado": "sin leer", 
  "titulo": "Tu mensaje aquí"
}
```

❌ **Formato ANTIGUO (ya corregido):**
```javascript
{
  "id": "timestamp",
  "texto": "mensaje",
  "fecha": "2025-08-02"
}
```

Los componentes `ReservaFormulario.jsx` y `ReservaCardAdmin.jsx` ya fueron actualizados para usar el formato correcto.
