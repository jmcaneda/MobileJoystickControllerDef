document.addEventListener('DOMContentLoaded', () => {
    const controller = {
        init() {
            this.socket = null;
            this.touchActive = false;
            this.setupWebSocket();
            this.setupControls();
        },

        setupWebSocket() {
            this.socket = io();
            
            this.socket.on('connect', () => {
                console.log('Connected to server');
                document.getElementById('status').textContent = 'Connected';
                document.getElementById('status').classList.remove('text-danger');
                document.getElementById('status').classList.add('text-success');
            });

            this.socket.on('disconnect', () => {
                console.log('Disconnected from server');
                document.getElementById('status').textContent = 'Disconnected';
                document.getElementById('status').classList.remove('text-success');
                document.getElementById('status').classList.add('text-danger');
            });
        },

        setupControls() {
            const joystick = document.getElementById('joystick');
            const buttons = document.querySelectorAll('.control-btn');
            const inputToggle = document.createElement('button');
            inputToggle.id = 'input-toggle';
            inputToggle.className = 'control-btn';
            inputToggle.textContent = 'Touch Input: OFF';
            inputToggle.dataset.state = 'off';
            document.querySelector('.controls-container').appendChild(inputToggle);
            
            inputToggle.addEventListener('click', () => {
                const newState = inputToggle.dataset.state === 'on' ? 'off' : 'on';
                inputToggle.dataset.state = newState;
                inputToggle.textContent = `Touch Input: ${newState.toUpperCase()}`;
                this.emitControlEvent('inputMethod', { state: newState });
            });

            // Touch events for joystick
            joystick.addEventListener('touchstart', (e) => {
                e.preventDefault();
                this.touchActive = true;
                this.handleJoystickMove(e.touches[0]);
            });

            document.addEventListener('touchmove', (e) => {
                e.preventDefault();
                if (this.touchActive) {
                    this.handleJoystickMove(e.touches[0]);
                }
            });

            document.addEventListener('touchend', () => {
                this.touchActive = false;
                this.emitControlEvent('joystick', { x: 0, y: 0 });
                joystick.style.transform = 'translate(-50%, -50%)';
            });

            // Button events
            buttons.forEach(button => {
                button.addEventListener('touchstart', (e) => {
                    e.preventDefault();
                    const action = button.dataset.action;
                    this.emitControlEvent('button', { action, state: 'pressed' });
                    button.classList.add('active');
                });

                button.addEventListener('touchend', (e) => {
                    e.preventDefault();
                    const action = button.dataset.action;
                    this.emitControlEvent('button', { action, state: 'released' });
                    button.classList.remove('active');
                });
            });
        },

        handleJoystickMove(touch) {
            const joystick = document.getElementById('joystick');
            const joystickBound = document.getElementById('joystick-area').getBoundingClientRect();
            const centerX = joystickBound.left + joystickBound.width / 2;
            const centerY = joystickBound.top + joystickBound.height / 2;
            
            const maxDistance = joystickBound.width / 4;
            
            let x = (touch.clientX - centerX) / maxDistance;
            let y = (touch.clientY - centerY) / maxDistance;
            
            // Normalize values
            const magnitude = Math.sqrt(x * x + y * y);
            if (magnitude > 1) {
                x /= magnitude;
                y /= magnitude;
            }
            
            // Update joystick position
            const moveX = x * maxDistance;
            const moveY = y * maxDistance;
            joystick.style.transform = `translate(calc(-50% + ${moveX}px), calc(-50% + ${moveY}px))`;
            
            this.emitControlEvent('joystick', { x, y });
        },

        emitControlEvent(type, data) {
            if (this.socket && this.socket.connected) {
                this.socket.emit('control_event', {
                    type,
                    data,
                    timestamp: Date.now()
                });
            }
        }
    };

    controller.init();
});
