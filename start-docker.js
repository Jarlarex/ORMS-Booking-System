const { spawn } = require('child_process');
const path = require('path');

// Configuration
const BACKEND_PORT = process.env.BACKEND_PORT || 3000;
const FRONTEND_DIST_PATH = path.join(__dirname, 'frontend', 'dist');

console.log('Starting Restaurant Booking System in Docker...');

// Start the backend server
const backend = spawn('node', [path.join(__dirname, 'backend', 'src', 'app', 'server.js')], {
  env: {
    ...process.env,
    PORT: BACKEND_PORT,
    NODE_ENV: 'production'
  }
});

backend.stdout.on('data', (data) => {
  console.log(`[Backend]: ${data}`);
});

backend.stderr.on('data', (data) => {
  console.error(`[Backend Error]: ${data}`);
});

backend.on('close', (code) => {
  console.log(`Backend process exited with code ${code}`);
  process.exit(code);
});

// Serve the frontend static files
const http = require('http');
const fs = require('fs');
const url = require('url');
const mime = require('mime-types');

const server = http.createServer((req, res) => {
  // Parse URL
  const parsedUrl = url.parse(req.url);
  // Extract path
  let pathname = path.join(FRONTEND_DIST_PATH, parsedUrl.pathname);
  
  // If path ends with '/', serve index.html
  if (pathname.endsWith('/')) {
    pathname = path.join(pathname, 'index.html');
  }
  
  // Check if file exists
  fs.stat(pathname, (err, stats) => {
    if (err) {
      // If the file doesn't exist, serve index.html (for SPA routing)
      pathname = path.join(FRONTEND_DIST_PATH, 'index.html');
      fs.readFile(pathname, (err, data) => {
        if (err) {
          res.statusCode = 500;
          res.end(`Error getting the file: ${err}.`);
        } else {
          // Set Content-type
          res.setHeader('Content-type', 'text/html');
          res.end(data);
        }
      });
      return;
    }
    
    // If it's a directory, serve index.html
    if (stats.isDirectory()) {
      pathname = path.join(pathname, 'index.html');
    }
    
    // Read file
    fs.readFile(pathname, (err, data) => {
      if (err) {
        res.statusCode = 500;
        res.end(`Error getting the file: ${err}.`);
      } else {
        // Set Content-type
        const contentType = mime.lookup(pathname) || 'application/octet-stream';
        res.setHeader('Content-type', contentType);
        res.end(data);
      }
    });
  });
});

// Start the frontend server
const FRONTEND_PORT = 5173;
server.listen(FRONTEND_PORT, () => {
  console.log(`[Frontend]: Server running at http://localhost:${FRONTEND_PORT}/`);
});

console.log('Restaurant Booking System started successfully!');
console.log(`Backend API running on port ${BACKEND_PORT}`);
console.log(`Frontend running on port ${FRONTEND_PORT}`);

// Handle process termination
process.on('SIGINT', () => {
  console.log('Shutting down...');
  backend.kill();
  server.close();
  process.exit(0);
});
