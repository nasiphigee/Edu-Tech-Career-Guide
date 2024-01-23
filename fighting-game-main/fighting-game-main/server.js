const http = require('http');
const fs = require('fs');
const path = require('path');

const port = 3000; // Port on which the server will listen

const server = http.createServer((req, res) => {
  const filePath = req.url === '/' ? '/index.html' : req.url;
  const fileExtension = path.extname(filePath);
  const contentType = getContentType(fileExtension);

  fs.readFile(__dirname + filePath, (err, data) => {
    if (err) {
      res.writeHead(404, { 'Content-Type': 'text/html' });
      res.end('404 Not Found');
    } else {
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(data);
    }
  });
});

server.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

function getContentType(fileExtension) {
  switch (fileExtension) {
    case '.html':
      return 'text/html';
    case '.css':
      return 'text/css';
    case '.js':
      return 'text/javascript';
    case '.jpg':
      return 'image/jpeg';
    case '.png':
      return 'image/png';
    default:
      return 'text/plain';
  }
}
