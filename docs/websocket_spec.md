# WebSocket Implementation Documentation

## Overview
Este proyecto implementa una comunicación bidireccional en tiempo real entre un controlador móvil y un juego Unity WebGL usando WebSocket.

## Arquitectura WebSocket

### Componentes Principales
1. **Servidor WebSocket (app.py)**
   - Implementado con Flask-SocketIO
   - Sistema de logging DEBUG
   - Identificación de tipo de cliente
   - Gestión de conexiones múltiples

2. **Cliente Controlador (controller.js)**
   - Interfaz de usuario responsiva
   - Emisión de eventos WebSocket
   - Sistema de reconexión automática

3. **Cliente Unity (websocket.js)**
   - Integración con Unity WebGL
   - Sistema de caché para recursos
   - Logging detallado de progreso

## Debug y Logging

### Servidor
```python
DEBUG:app:Client connected
DEBUG:app:Client type: unity
```

### Cliente Unity
```javascript
"Loading progress: X%" // Progreso de carga
"[UnityCache] Resource revalidation" // Estado de caché
"navigator.mediaDevices support" // Estado de dispositivos
```

## Eventos del Sistema

### Conexión
```javascript
{
    "type": "connection",
    "clientType": "unity|controller",
    "status": "connected|disconnected"
}
```

### Control
```javascript
{
    "type": "input",
    "source": "touch|keyboard",
    "data": {
        // datos específicos del input
    }
}
```

## Optimizaciones

### Caché
- Sistema IndexedDB para recursos
- Revalidación automática de assets
- Persistencia de datos de build

### Rendimiento
- Logging detallado de progreso
- Sistema de reconexión automática
- Validación de recursos en caché

## Monitoreo
- Debug logs en servidor
- Progreso de carga en cliente
- Estado de dispositivos
- Validación de caché

## Gestión de Errores
- Logging multinivel
- Revalidación de recursos
- Feedback visual de estados
- Reconexión automática