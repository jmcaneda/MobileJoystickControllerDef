
# Mapeo de Código al Diagrama de Flujo de Datos

## Componentes Principales

### Dispositivo Móvil
- `templates/controller.html`: Interfaz del controlador
- `static/js/controller.js`: Lógica del controlador
- `static/css/styles.css`: Estilos del controlador

### Servidor Flask
- `app.py`: Servidor principal y WebSocket
- `main.py`: Punto de entrada
- Sistema de logging DEBUG

### Unity WebGL
- `templates/game.html`: Contenedor Unity
- `static/js/websocket.js`: Cliente WebSocket
- `static/js/wasm-debug.js`: Debug WASM
- `static/Build/*`: Build Unity WebGL

## Archivos de Build Unity
```
static/Build/
├── Builds.data
├── Builds.framework.js
├── Builds.loader.js
└── Builds.wasm
```

## Archivos de Configuración
```
static/TemplateData/
├── style.css
└── [assets visuales]
```

## Sistema de Logging
- Servidor: Logs DEBUG en app.py
- Cliente: Logs de progreso en consola
- WASM: Debug específico para WebAssembly

## Flujo de Datos
1. Input móvil -> WebSocket
2. Servidor -> Logging -> Reenvío
3. Cliente Unity -> WASM -> Juego

## Relaciones de Archivos
- controller.js <-> app.py: WebSocket
- app.py <-> websocket.js: Eventos
- websocket.js <-> Unity: Integración
- wasm-debug.js: Monitoreo WASM
