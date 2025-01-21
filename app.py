import os
from flask import Flask, render_template
from flask_socketio import SocketIO, emit
import logging

# Configure logging
logging.basicConfig(level=logging.DEBUG)
logger = logging.getLogger(__name__)

app = Flask(__name__)
app.config['SECRET_KEY'] = os.environ.get("FLASK_SECRET_KEY") or "game_controller_secret"
socketio = SocketIO(app, cors_allowed_origins="*")

@app.route('/')
def index():
    return render_template('game.html')

@app.route('/controller')
def controller():
    return render_template('controller.html')

@socketio.on('connect')
def handle_connect():
    logger.debug('Client connected')
    emit('connection_response', {'data': 'Connected'})

@socketio.on('disconnect')
def handle_disconnect():
    logger.debug('Client disconnected')

@socketio.on('control_event')
def handle_control_event(data):
    logger.debug(f'Received control event: {data}')
    # Broadcast the control event to all connected clients (including Unity)
    emit('game_control', data, broadcast=True)

@socketio.on_error()
def error_handler(e):
    logger.error(f'SocketIO error: {str(e)}')
