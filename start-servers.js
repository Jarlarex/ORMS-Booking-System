const { spawn } = require('child_process');
const path = require('path');
const os = require('os');

// Determine the command prefix based on the OS
const isWindows = os.platform() === 'win32';
const npmCmd = isWindows ? 'npm.cmd' : 'npm';

// Function to start a server
function startServer(name, cwd, command, args) {
  console.log(`Starting ${name} server...`);
  
  const server = spawn(command, args, {
    cwd,
    stdio: 'pipe',
    shell: true
  });
  
  server.stdout.on('data', (data) => {
    console.log(`[${name}] ${data.toString().trim()}`);
  });
  
  server.stderr.on('data', (data) => {
    console.error(`[${name}] ${data.toString().trim()}`);
  });
  
  server.on('close', (code) => {
    console.log(`${name} server exited with code ${code}`);
  });
  
  return server;
}

// Start the backend server
const backendPath = path.join(__dirname, 'backend');
const backendServer = startServer('Backend', backendPath, npmCmd, ['run', 'dev']);

// Start the frontend server
const frontendPath = path.join(__dirname, 'frontend', 'vue-project');
const frontendServer = startServer('Frontend', frontendPath, npmCmd, ['run', 'dev']);

// Handle process termination
process.on('SIGINT', () => {
  console.log('Shutting down servers...');
  backendServer.kill();
  frontendServer.kill();
  process.exit(0);
});
