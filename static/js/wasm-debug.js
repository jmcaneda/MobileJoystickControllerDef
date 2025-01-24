
window.addEventListener('unhandledrejection', function(e) {
    if (e.reason && e.reason.toString().includes('wasm')) {
        console.error('WASM Loading Error:', e.reason);
        console.log('Attempting reload...');
        setTimeout(() => window.location.reload(), 1000);
    }
});

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

    return new Promise((resolve, reject) => {
        if (wasmSupport === 'unsupported') {
            reject(new Error('WebAssembly not supported'));
            return;
        }

        const fetchPromise = fetch(url);
        
        if (wasmSupport === 'streaming') {
            fetchPromise
                .then(response => {
                    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
                    console.info('WASM streaming compilation starting...');
                    return WebAssembly.instantiateStreaming(response);
                })
                .then(obj => {
                    console.info('WASM streaming compilation complete');
                    resolve(obj.instance);
                })
                .catch(error => {
                    console.error('WASM streaming compilation failed:', error);
                    reject(error);
                });
        } else {
            fetchPromise
                .then(response => {
                    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
                    console.info('WASM file downloaded, starting compilation...');
                    return response.arrayBuffer();
                })
                .then(bytes => WebAssembly.instantiate(bytes))
                .then(obj => {
                    console.info('WASM compilation complete');
                    resolve(obj.instance);
                })
                .catch(error => {
                    console.error('Error loading WASM:', error);
                    reject(error);
                });
        }
    });
}

// Export for use in other scripts
window.monitorWasmDownload = monitorWasmDownload;