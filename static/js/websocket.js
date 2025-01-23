class GameWebSocket {
    constructor() {
        this.socket = null;
        this.gameInstance = null;
        this.connected = false;
    }

    init(gameInstance) {
        this.gameInstance = gameInstance;
        this.socket = io();

        this.socket.on('connect', () => {
            console.log('Game connected to WebSocket');
            this.connected = true;
            this.socket.emit('client_type', { type: 'unity' });
            window.dispatchEvent(new Event('game-connected'));
        });

        this.socket.on('disconnect', () => {
            console.log('Game disconnected from WebSocket');
            this.connected = false;
        });

        this.socket.on('connect_error', (error) => {
            console.error('WebSocket connection error:', error);
            setTimeout(() => {
                this.socket.connect();
            }, 1000);
        });

        this.socket.on('game_control', (data) => {
            this.handleGameControl(data);
        });
    }

    handleGameControl(data) {
        if (!this.gameInstance) return;

        // Send the control data to Unity
        switch(data.type) {
            case 'joystick':
                this.gameInstance.SendMessage('MaribelController', 'HandleJoystickInput', 
                    JSON.stringify(data.data));
                break;
            case 'button':
                this.gameInstance.SendMessage('MaribelController', 'HandleButtonInput',
                    JSON.stringify(data.data));
                break;
            case 'inputMethod':
                this.gameInstance.SendMessage('MaribelController', 'HandleInputMethod',
                    JSON.stringify(data.data));
                break;
        }
    }
}

// Global instance for Unity to access
window.gameWebSocket = new GameWebSocket();