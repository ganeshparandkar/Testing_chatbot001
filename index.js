const http = require('http');

// Create an HTTP server
const server = http.createServer((req, res) => {
    // Check if the incoming request method is POST
    if (req.method === 'POST') {
        let body = '';

        // Collect data from the request body
        req.on('data', (chunk) => {
            body += chunk.toString();
        });

        // When all data is received
        req.on('end', () => {
            // Send a response with status code 200 (OK) and "Hi!" message
            res.writeHead(200, { 'Content-Type': 'text/plain' });
            res.end('Hi!');
        });
    } else {
        // If the request method is not POST, send a 404 (Not Found) response
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('404 Not Found');
    }
});

// Set the port for the server to listen on
const port = 3000;

// Start the server and listen on the specified port
server.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});
