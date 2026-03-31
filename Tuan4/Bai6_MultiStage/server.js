const http = require('http');

const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Hello, Docker with Multi-stage Build!\n');
});

server.listen(3000, () => {
  console.log('Multi-stage app running on http://localhost:3000');
});
