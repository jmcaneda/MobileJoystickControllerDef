
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
    fetch(url)
        .then(response => {
            console.info('=== WASM Download Info ===');
            console.info('Status:', response.status);
            console.info('Content-Type:', response.headers.get('content-type'));
            console.info('Content-Length:', response.headers.get('content-length'));
            return response;
        })
        .catch(error => {
            console.error('WASM Download Error:', error);
        });
}
