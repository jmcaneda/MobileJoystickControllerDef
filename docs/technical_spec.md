# Especificación Técnica: Sistema de Control de Videojuegos Móvil

## Arquitectura del Sistema

### Componentes Principales
1. **Servidor Flask (Backend)**
   - Gestiona las conexiones WebSocket
   - Enruta los eventos entre dispositivos móviles y Unity
   - Implementa el protocolo de comunicación
   - Sistema de logging para debugging

2. **Controlador Móvil (Frontend)**
   - Interfaz táctil responsiva 
   - Joystick virtual y botones direccionales
   - Toggle para método de entrada (Touch/Keyboard)
   - Conexión WebSocket en tiempo real

3. **Cliente Unity (WebGL)**
   - Integración WebSocket bidireccional
   - Sistema dual de entrada (Touch/Keyboard)
   - Sistema de movimiento NavMesh
   - Memoria WASM limitada a 512MB
   - Sistema de caché IndexedDB para assets
   - Carga progresiva con feedback visual

### Diagrama de Flujo de Datos
```
[Dispositivo Móvil] --> (WebSocket) --> [Servidor Flask] --> (WebSocket) --> [Unity WebGL]
     ^                                                                            |
     |                                    Feedback                                |
     +------------------------------------------------------------------------ +
```

## Protocolo de Comunicación

### Eventos WebSocket

#### 1. Conexión
```javascript
{
    "type": "connection",
    "data": {
        "clientType": "unity|controller",
        "status": "connected"
    }
}
```

#### 2. Control de Joystick
```javascript
{
    "type": "joystick",
    "data": {
        "x": float,  // Rango: -1.0 a 1.0
        "y": float   // Rango: -1.0 a 1.0
    },
    "timestamp": long
}
```

#### 3. Control de Botones
```javascript
{
    "type": "button",
    "data": {
        "action": string,  // "up", "down", "left", "right", "A", "B"
        "state": string   // "pressed", "released"
    },
    "timestamp": long
}
```

## Sistema de Control

### Modos de Entrada
1. **Control Táctil (Touch Input)**
   - Joystick virtual para movimiento
   - Botones direccionales
   - Botones de acción (A, B)

2. **Control por Teclado**
   - WASD o flechas para movimiento
   - Teclas configurables para acciones

## Configuración WebGL

### Memoria y Rendimiento
- Límite de memoria WASM: 512MB
- Caché IndexedDB para assets
- Antialiasing: Desactivado
- Profundidad: Activada
- Preferencia de rendimiento: Alto rendimiento

### Optimizaciones
1. **Carga**
   - Barra de progreso visual
   - Carga progresiva de assets
   - Sistema de caché para builds
   - Validación de recursos

2. **Runtime**
   - Memoria preconfigurada para rendimiento
   - Configuración de bloques de memoria
   - Profiler integrado
   - Sistema de logs detallado

## Seguridad y Monitoreo
- Debug incorporado para WASM
- Sistema de logging multinivel
- Manejo de errores con feedback visual
- Validación de recursos y conexiones