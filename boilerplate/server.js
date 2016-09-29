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
            res.writeHead(200, {
                'Content-Type': 'text/html'
            });

            fs.createReadStream('index.html').pipe(res);
            break;

        case '/index.js':
            res.writeHead(200, {
                'Content-Type': 'application/javascript'
            });

            fs.createReadStream('index.js').pipe(res);
            break;

        default:
            res.writeHead(404, {
                'Content-Type': 'text/plain'
            });

            res.end('Not Found', 'utf-8');
    }
}