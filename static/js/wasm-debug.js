// WASM Loading Debug Helper
window.addEventListener('error', function(e) {
    if (e.message.includes('wasm')) {
        console.error('=== WASM Loading Error ===');
        console.error('Error Message:', e.message);
        console.error('File:', e.filename);
        console.error('Line:', e.lineno);
        console.error('Column:', e.colno);
        console.error('Stack:', e.error?.stack);
        
        // Check browser WASM support
        console.info('Browser WASM Support:', {
            'WebAssembly Available': typeof WebAssembly !== 'undefined',
            'Streaming Available': typeof WebAssembly.instantiateStreaming === 'function'
        });
    }
});

// Monitor WASM download progress
function monitorWasmDownload(url) {
    console.info('Initializing WASM download...');

    const checkWasmSupport = () => {
        if (typeof WebAssembly === 'object') {
            return WebAssembly.instantiateStreaming ? 'streaming' : 'fallback';
        }
        return 'unsupported';
    };

    const wasmSupport = checkWasmSupport();
    console.info(`WebAssembly support: ${wasmSupport}`);

    return fetch(url)
        .then(response => {
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
            console.info('WASM file downloaded successfully');
            return response;
        })
        .catch(error => {
            console.error('Error loading WASM:', error);
            throw error;
        });
}

// Export for use in other scripts
window.monitorWasmDownload = monitorWasmDownload;