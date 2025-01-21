# Especificación Técnica: Sistema de Control de Videojuegos Móvil

## Arquitectura del Sistema

### Componentes Principales
1. **Servidor Flask (Backend)**
   - Gestiona las conexiones WebSocket
   - Enruta los eventos entre dispositivos móviles y Unity
   - Implementa el protocolo de comunicación

2. **Controlador Móvil (Frontend)**
   - Interfaz táctil responsiva
   - Joystick virtual y botones direccionales
   - Toggle para método de entrada (Touch/Keyboard)
   - Conexión WebSocket en tiempo real

3. **Cliente Unity (WebGL)**
   - Integración con WebSocket
   - Sistema dual de entrada (Touch/Keyboard)
   - Sistema de movimiento NavMesh
   - Animaciones del personaje

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
    "data": "Connected"
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

#### 4. Método de Entrada
```javascript
{
    "type": "inputMethod",
    "data": {
        "state": string  // "on", "off"
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

### Estados del Control
- Conectado/Desconectado
- Método de entrada activo
- Estado de botones
- Posición del joystick

## Integración con Unity

### Componentes Principales
1. **PlayerController**
   - Control de movimiento
   - Gestión de animaciones
   - Sistema NavMesh
   - Manejo dual de entrada

2. **GameManager**
   - Control de estado del juego
   - Gestión de modo de entrada
   - Configuración del sistema


## Consideraciones de Rendimiento

### Latencia
- Tiempo de respuesta objetivo: <100ms
- Buffer de entrada: 3 frames
- Interpolación de movimiento suave

### Optimización
1. **WebSocket**
   - Compresión de payload
   - Rate limiting: 60fps
   - Buffer de eventos

2. **Unity WebGL**
   - Memoria heap: 512MB
   - Compresión de texturas
   - Optimización de físicas

## Depuración

### Herramientas
1. **Browser DevTools**
   - Network tab para WebSocket
   - Console para logs

2. **Unity Debug**
   - Debug.Log para eventos
   - Visual feedback en GameObject

### Códigos de Error Comunes
| Código | Descripción | Solución |
|--------|-------------|----------|
| WS001  | Conexión perdida | Reconexión automática |
| WS002  | Datos malformados | Validación de JSON |
| UN001  | Script no encontrado | Verificar GameObject |

## Seguridad

### Consideraciones
1. SSL/TLS para WebSocket
2. Validación de inputs
3. Rate limiting por cliente
4. Sanitización de datos JSON