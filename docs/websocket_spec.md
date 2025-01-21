
# WebSocket Implementation Documentation

## Overview
Este proyecto implementa una comunicación bidireccional en tiempo real entre un controlador móvil y un juego Unity WebGL utilizando WebSocket como protocolo de comunicación.

## Arquitectura WebSocket

### Componentes Principales
1. **Servidor WebSocket (app.py)**
   - Implementado con Flask-SocketIO
   - Gestiona conexiones y desconexiones
   - Retransmite eventos entre el controlador y Unity

2. **Cliente Controlador (controller.js)**
   - Implementa la interfaz de usuario del controlador
   - Captura eventos táctiles y de botones
   - Emite eventos WebSocket al servidor

3. **Cliente Unity (websocket.js)**
   - Recibe eventos del servidor
   - Comunica con el juego Unity via SendMessage
   - Gestiona la conexión WebSocket del lado del juego

## Flujo de Datos

### Eventos del Controlador
1. **Joystick Virtual**
   ```javascript
   {
       "type": "joystick",
       "data": {
           "x": float,  // -1.0 a 1.0
           "y": float   // -1.0 a 1.0
       },
       "timestamp": long
   }
   ```

2. **Botones de Control**
   ```javascript
   {
       "type": "button",
       "data": {
           "action": string,  // "up", "down", "left", "right", "A", "B"
           "state": string    // "pressed", "released"
       },
       "timestamp": long
   }
   ```

3. **Método de Entrada**
   ```javascript
   {
       "type": "inputMethod",
       "data": {
           "state": string    // "on", "off"
       },
       "timestamp": long
   }
   ```

## Implementación Detallada

### Servidor (app.py)
- Maneja eventos de conexión/desconexión
- Retransmite eventos del controlador
- Implementa logging para debugging
- Usa CORS para permitir conexiones desde diferentes orígenes

### Cliente Controlador (controller.js)
- Establece conexión WebSocket al cargar
- Normaliza inputs del joystick
- Gestiona estado de botones
- Implementa feedback visual de conexión

### Cliente Unity (websocket.js)
- Se inicializa con la instancia del juego Unity
- Traduce eventos WebSocket a llamadas Unity
- Mantiene estado de conexión
- Gestiona reconexión automática

## Consideraciones de Seguridad
- Validación de inputs en el servidor
- Sanitización de datos JSON
- Rate limiting implícito por WebSocket
- Control de origen de conexiones

## Gestión de Errores
- Reconexión automática
- Logging de errores
- Feedback visual al usuario
- Validación de datos

## Optimización
- Mensajes compactos
- Rate limiting natural
- Buffering de eventos rápidos
- Priorización de eventos críticos
