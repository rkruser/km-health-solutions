const fs = require('fs');
const https = require('https');
const express = require('express');

// New lines
const bodyParser = require('body-parser');
const cors = require('cors');
const { completeText } = require('./completion');
require('dotenv').config()
console.log('Environmental var OPENAI_API_KEY set as: ', process.env.OPENAI_API_KEY)

const app = express();
const port = 3000;

// Set the path to your self-signed SSL certificate and private key
const privateKey = fs.readFileSync('C:/Certbot/live/ryenandvivekstartup.online/privkey.pem', 'utf8');
const certificate = fs.readFileSync('C:/Certbot/live/ryenandvivekstartup.online/fullchain.pem', 'utf8');

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

// New lines
app.use(bodyParser.json());
app.use(cors());

app.use(express.static('build')); // Replace 'build' with the path to your React app's build directory


// New lines
app.post('/complete-text', async (req, res) => {
    try {
      const prompt = req.body.prompt;
      const completion = await completeText(prompt);
      res.json({ completion }); // No 'await' here
    } catch (error) {
      console.error('Error completing text:', error);
      res.status(500).send('Error: could not access chatGPT');
    }
  });
  
  


const server = https.createServer(credentials, app).listen(port, () => {
  console.log(`Server running at https://localhost:${port}`);
});

server.on('request', (req, res) => {
    const currentDateTime = new Date();
    const formatter = new Intl.DateTimeFormat('en-US', {
      timeZone: 'America/New_York',
      dateStyle: 'full',
      timeStyle: 'long',
      });
    console.log(formatter.format(currentDateTime));
    console.log(`Incoming request from ${req.connection.remoteAddress}:${req.connection.remotePort}`);
    console.log(`Request method: ${req.method}`);
    console.log(`Request URL: ${req.url}`);
  });