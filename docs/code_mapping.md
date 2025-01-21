
# Mapeo de Código al Diagrama de Flujo de Datos

Este documento mapea los archivos de código a las diferentes partes del diagrama de flujo de datos descrito en `technical_spec.md`:

```
[Dispositivo Móvil] --> (WebSocket) --> [Servidor Flask] --> (WebSocket) --> [Unity WebGL]
     ^                                                                            |
     |                                    Feedback                                |
     +------------------------------------------------------------------------ +
```

## Dispositivo Móvil
- `templates/controller.html`: Interfaz del controlador móvil
- `static/js/controller.js`: Lógica del controlador, manejo de eventos táctiles y emisión de eventos WebSocket
- `static/css/styles.css`: Estilos del controlador y elementos de interfaz

## Servidor Flask (WebSocket)
- `app.py`: Servidor Flask principal, manejo de rutas y eventos WebSocket
- `main.py`: Punto de entrada de la aplicación

## Unity WebGL
- `templates/game.html`: Contenedor web para el juego Unity
- `static/js/websocket.js`: Cliente WebSocket para Unity, recibe y procesa eventos del controlador
- `PlayerController.cs`: Controlador del personaje en Unity, recibe y procesa inputs
- `static/Build/*`: Archivos compilados del juego Unity

## Flujo de Comunicación
1. El controlador (`controller.js`) captura eventos táctiles
2. Los eventos se envían via WebSocket al servidor (`app.py`)
3. El servidor transmite los eventos al cliente Unity (`websocket.js`)
4. Unity procesa los eventos en `PlayerController.cs`
