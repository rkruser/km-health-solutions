const fs = require('fs');
const https = require('https');
const express = require('express');
const app = express();
const port = 3000;

// Set the path to your self-signed SSL certificate and private key
const privateKey = fs.readFileSync('cert.key', 'utf8');
const certificate = fs.readFileSync('cert.crt', 'utf8');

const credentials = {
  key: privateKey,
  cert: certificate,
};

// Set up Basic Authentication
const basicAuth = require('express-basic-auth');
const users = { 'admin': 'TTd3#U#KmY=na>)QAk?p' }; // Replace with your desired username and password

app.use(basicAuth({
  users: users,
  challenge: true,
  unauthorizedResponse: 'Unauthorized',
}));

app.use(express.static('build')); // Replace 'build' with the path to your React app's build directory

const server = https.createServer(credentials, app).listen(port, () => {
  console.log(`Server running at https://localhost:${port}`);
});

server.on('request', (req, res) => {
  console.log(`Incoming request from ${req.connection.remoteAddress}:${req.connection.remotePort}`);
  console.log(`Request method: ${req.method}`);
  console.log(`Request URL: ${req.url}`);
});
