'use strict';

const PORT = 8001;

const http = require('http');
const fs = require('fs');
const server = http.createServer(respond);

server.listen(PORT, () => console.log(`Server listening on ${PORT}...`));

function respond(req, res) {
    switch (req.url) {
        case '/':
        case '/index.html':
            serveFile(res, 'index.html', 'text/html');
            break;

        case '/index.js':
            serveFile(res, 'index.js', 'application/javascript');
            break;

        case '/index.css':
            serveFile(res, 'index.css', 'text/css');
            break;

        default:
            notFound(res);
    }
}

function serveFile(res, filename, contentType) {
    res.writeHead(200, {
        'Content-Type': contentType
    });

    return fs.createReadStream(filename).pipe(res);
}

function notFound(res) {
    res.writeHead(404, {
        'Content-Type': 'text/plain'
    });

    res.end('Not Found', 'utf-8');
}