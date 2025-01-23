import os
from flask import Flask, render_template, send_from_directory
import mimetypes
from flask_socketio import SocketIO, emit
import logging

# Add MIME type for WebAssembly
mimetypes.add_type('application/wasm', '.wasm')

# Configure logging
logging.basicConfig(level=logging.DEBUG)
logger = logging.getLogger(__name__)

app = Flask(__name__)
app.config['SECRET_KEY'] = os.environ.get("FLASK_SECRET_KEY") or "game_controller_secret"
socketio = SocketIO(app, cors_allowed_origins="*")

@app.route('/')
def index():
    return render_template('game.html')

@app.route('/static/<path:path>')
def serve_static(path):
    try:
        app.logger.info("=== Execution Tracking ===")
        app.logger.info(f"[Line START] serve_static({path})")
        app.logger.info(f"Attempting to serve static file: {path}")
        
        # Verify file exists
        full_path = os.path.join('static', path)
        if not os.path.exists(full_path):
            app.logger.error(f"File not found: {full_path}")
            return f"File not found: {path}", 404
            
        if path.endswith('.wasm'):
            app.logger.info(f"WASM file request detected: {path}")
            app.logger.info(f"WASM file size: {os.path.getsize(full_path)} bytes")
            app.logger.info("Verifying WASM file integrity...")
            try:
                with open(full_path, 'rb') as f:
                    wasm_header = f.read(4)
                    if wasm_header == b'\x00\x61\x73\x6D':
                        app.logger.info("WASM file header verified successfully")
                    else:
                        app.logger.warning("Invalid WASM file header detected")
            except Exception as e:
                app.logger.error(f"Error reading WASM file: {str(e)}")
            
        app.logger.info(f"File found: {full_path}")
        response = send_from_directory('static', path)
        app.logger.info(f"File type: {response.mimetype}")
        
        if path.endswith('.wasm'):
            app.logger.info("Processing WASM file")
            app.logger.info("Setting WASM specific headers...")
            response.headers['Content-Type'] = 'application/wasm'
            response.headers['Cross-Origin-Embedder-Policy'] = 'require-corp'
            response.headers['Cross-Origin-Opener-Policy'] = 'same-origin'
            app.logger.info("WASM CORS headers set")
            response.headers['Cross-Origin-Resource-Policy'] = 'cross-origin'
            response.headers['Accept-Ranges'] = 'bytes'
            response.headers['Access-Control-Allow-Origin'] = '*'
            response.headers['Access-Control-Allow-Methods'] = 'GET, OPTIONS'
            response.headers['Cache-Control'] = 'no-cache, no-store, must-revalidate'
            response.direct_passthrough = True
            app.logger.info("WASM headers set successfully")
        elif path.endswith('.js'):
            app.logger.info("Processing JS file")
            response.headers['Content-Type'] = 'application/javascript'
            app.logger.info("JS headers set successfully")
            
        app.logger.info(f"Successfully serving {path}")
        app.logger.info("[Line SUCCESS] Last successful line before return")
        return response
    except Exception as e:
        app.logger.error("=== Error Tracking ===")
        app.logger.error("Last successful line: serve_static - before exception")
        app.logger.error(f"Error serving {path}: {str(e)}", exc_info=True)
        if path.endswith('.wasm'):
            try:
                size = os.path.getsize('static/' + path)
                app.logger.error(f"WASM file size: {size} bytes")
            except OSError as ose:
                app.logger.error(f"Could not get WASM file size: {str(ose)}")
        return f"Failed to serve {path}: {str(e)}", 500

@app.route('/controller')
def controller():
    return render_template('controller.html')

@socketio.on('connect')
def handle_connect():
    app.logger.debug('Client connected')

@socketio.on('client_type')
def handle_client_type(data):
    app.logger.debug(f'Client type: {data.get("type")}')

@socketio.on('disconnect')
def handle_disconnect():
    app.logger.debug('Client disconnected')

@socketio.on('control_event')
def handle_control_event(data):
    app.logger.debug(f'Received control event: {data}')
    # Broadcast the control event to all connected clients (including Unity)
    emit('game_control', data, broadcast=True)

@socketio.on_error()
def error_handler(e):
    app.logger.error(f'SocketIO error: {str(e)}')