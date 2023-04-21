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

app.use(express.static('build')); // Replace 'build' with the path to your React app's build directory

https.createServer(credentials, app).listen(port, () => {
  console.log(`Server running at https://localhost:${port}`);
});
