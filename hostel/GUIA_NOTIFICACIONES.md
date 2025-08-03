# Sistema de Notificaciones - Guía de Uso

## Descripción
El sistema de notificaciones permite a los usuarios recibir y gestionar notificaciones en tiempo real con las siguientes características:

- 🔔 Badge de notificaciones en el header
- 📱 Página dedicada para gestionar notificaciones
- 🔄 Actualización automática cada 30 segundos
- 👁️ Marcar como leído/no leído
- 🗑️ Eliminar notificaciones
- 🎯 Notificaciones específicas por usuario

## Componentes Creados

### 1. `Notificaciones.jsx`
- Componente principal para mostrar la lista de notificaciones
- Usa el hook personalizado `useNotificaciones`
- Permite marcar como leída y eliminar notificaciones
- Muestra contador de notificaciones sin leer

### 2. `NotificacionesBadge.jsx`
- Badge pequeño para mostrar en el header
- Muestra el icono de campana con contador
- Se integra automáticamente en el Header

### 3. `useNotificaciones.js` (Hook personalizado)
- Lógica reutilizable para gestionar notificaciones
- Funciones: cargar, crear, marcar como leída, eliminar
- Polling automático cada 30 segundos
- Contador de notificaciones sin leer

## API Endpoints Usados

```
GET /api/notificaciones/usuario/:id_usuario - Obtener notificaciones del usuario
POST /api/notificaciones                    - Crear nueva notificación
PUT /api/notificaciones/:id                 - Actualizar notificación (marcar como leída)
DELETE /api/notificaciones/:id              - Eliminar notificación
```

## Estructura de Datos

**Backend espera (POST):**
```javascript
{
  "id_usuario": 1,                    // ⚠️ IMPORTANTE: es "id_usuario", no "usuario_id"
  "tipo": "sistema",                  // mensaje, reserva, sistema
  "estado": "sin leer",               // "sin leer" o "leído"
  "titulo": "Nueva reserva confirmada",
  "fecha": "2025-08-02"              // Opcional, formato YYYY-MM-DD
}
```

**Backend devuelve:**
```javascript
{
  "id": "1",
  "id_usuario": "1",
  "tipo": "sistema",
  "estado": "sin leer",
  "titulo": "Nueva reserva confirmada", 
  "fecha": "2025-08-02T10:30:00.000Z"
}
```

## Tipos de Notificaciones
- **mensaje**: 💬 Nuevos mensajes
- **reserva**: 📅 Actualizaciones de reservas
- **sistema**: ⚙️ Notificaciones del sistema
- **default**: 📢 Notificación general

## Cómo Usar

### 1. Integración Automática
El sistema ya está integrado en:
- ✅ Header principal (badge con contador)
- ✅ Rutas configuradas (`/notificaciones` y `/admin/notificaciones`)
- ✅ Páginas de notificaciones existentes

### 2. Crear Notificaciones desde el Backend

```javascript
// ✅ FORMATO CORRECTO - Compatible con el backend actual
const crearNotificacion = async (usuarioId, titulo, tipo = 'sistema') => {
  try {
    const response = await axios.post('http://localhost:3002/api/notificaciones', {
      id_usuario: usuarioId,      // ⚠️ IMPORTANTE: "id_usuario", no "usuario_id"
      titulo: titulo,
      tipo: tipo,
      estado: 'sin leer'
    }, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error creando notificación:', error);
    throw error;
  }
};

// Ejemplos de uso:
await crearNotificacion(1, "Su reserva ha sido confirmada", "reserva");
await crearNotificacion(1, "Tiene un nuevo mensaje", "mensaje");
await crearNotificacion(1, "Mantenimiento programado mañana", "sistema");
```

### 3. Integración en Otros Componentes

```jsx
import { useNotificaciones } from '../hooks/useNotificaciones';

const MiComponente = () => {
  const { 
    notificaciones, 
    notificacionesSinLeer, 
    crearNotificacion 
  } = useNotificaciones();

  const enviarNotificacion = async () => {
    await crearNotificacion({
      id_usuario: 1,              // ⚠️ IMPORTANTE: "id_usuario"
      titulo: "Nueva notificación",
      tipo: "sistema",
      estado: "sin leer"
    });
  };

  return (
    <div>
      <p>Notificaciones sin leer: {notificacionesSinLeer}</p>
      <button onClick={enviarNotificacion}>
        Crear Notificación
      </button>
    </div>
  );
};
```

## Funcionalidades

### ✅ Implementado
- Badge de notificaciones en header
- Lista completa de notificaciones
- Marcar como leída individualmente
- Eliminar notificaciones
- Contador de no leídas
- Polling automático
- Diferentes tipos de notificaciones
- JWT authentication
- Rutas protegidas

### 🚀 Próximas Mejoras Sugeridas
- Notificaciones push en tiempo real (WebSockets)
- Notificaciones por email
- Categorización avanzada
- Filtros por tipo y fecha
- Notificaciones grupales
- Configuración de preferencias de usuario

## Pruebas

### 1. Verificar en el Header
- Inicia sesión
- El icono 🔔 debe aparecer junto al usuario
- Si hay notificaciones sin leer, aparece el contador rojo

### 2. Crear Notificación de Prueba

**✅ FORMATO CORRECTO (según backend):**
```bash
POST http://localhost:3002/api/notificaciones
Authorization: Bearer YOUR_JWT_TOKEN
Content-Type: application/json

{
  "id_usuario": 1,
  "tipo": "sistema",
  "estado": "sin leer",
  "titulo": "¡Notificación de prueba!"
}
```

**Campos obligatorios:**
- `id_usuario` (número) - ID del usuario
- `tipo` (string) - mensaje, reserva, sistema
- `estado` (string) - "sin leer" o "leído"  
- `titulo` (string) - Texto de la notificación

**Campo opcional:**
- `fecha` (string) - Formato YYYY-MM-DD (si no se envía, usa fecha actual)

### 3. Ver Notificaciones
- Haz clic en el badge del header
- O navega a `/notificaciones`
- Debe mostrar la nueva notificación

## Notas Técnicas

- El hook usa `useCallback` para optimizar rendimiento
- Las notificaciones se actualizan automáticamente cada 30 segundos
- El badge solo aparece si el usuario está logueado
- Soporte para usuarios admin y regulares
- CSS responsive para móviles
- Estado local sincronizado con el servidor

## Archivos Modificados/Creados

```
✅ src/components/Notificaciones.jsx (actualizado)
✅ src/components/Notificaciones.css (actualizado)
✅ src/components/NotificacionesBadge.jsx (nuevo)
✅ src/components/NotificacionesBadge.css (nuevo)
✅ src/components/Header.jsx (actualizado)
✅ src/hooks/useNotificaciones.js (nuevo)
📝 GUIA_NOTIFICACIONES.md (nuevo)
```

El sistema está listo para usar. Solo necesitas probar creando algunas notificaciones desde el backend para ver todo funcionando.
