
# Documentación de app.py

## Descripción General
app.py es el servidor principal Flask que maneja la comunicación WebSocket entre el controlador móvil y el juego Unity WebGL.

## Componentes Principales

### Configuración Inicial
- Configuración de MIME types para WebAssembly
- Inicialización de Flask y SocketIO
- Configuración de logging

### Rutas HTTP
- `/`: Sirve la página principal del juego
- `/controller`: Sirve la interfaz del controlador
- `/static/<path>`: Maneja archivos estáticos
- `/static/Build/<filename>`: Maneja archivos específicos de Unity

### Manejo WASM
- Configuración específica para archivos .wasm
- Headers CORS y seguridad
- Manejo de compresión y streaming

### WebSocket Events
- `connect`: Maneja conexiones nuevas
- `client_type`: Identifica tipo de cliente
- `disconnect`: Maneja desconexiones
- `control_event`: Procesa eventos del controlador

## Optimizaciones
- Caché para archivos estáticos
- Headers optimizados para WebAssembly
- Sistema de logging multinivel
