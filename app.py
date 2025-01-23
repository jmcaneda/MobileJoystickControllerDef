import os
from flask import Flask, render_template, send_from_directory
from flask_socketio import SocketIO, emit
import logging
import mimetypes

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
    response = send_from_directory('static', path)
    if path.endswith('.wasm'):
        response.headers['Content-Type'] = 'application/wasm'
        response.headers['Content-Encoding'] = ''  # Clear any content encoding
    elif path.endswith('.js'):
        response.headers['Content-Type'] = 'application/javascript'
    return response

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