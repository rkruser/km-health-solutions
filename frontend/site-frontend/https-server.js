const fs = require('fs');
const https = require('https');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { generateData, serverAPIquery } = require('./completion');
require('dotenv').config();

/*
console.log(process.argv);
console.log(typeof process.argv[2])
process.exit(0);
*/

const app = express();
const port = 4050;

// Set the path to your self-signed SSL certificate and private key
const privateKey = fs.readFileSync('privkey.pem', 'utf8');
const certificate = fs.readFileSync('fullchain.pem', 'utf8');
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

app.use(bodyParser.json());
app.use(cors());
app.use(express.static('build'));

app.post('/generate-data', async (req, res) => {
  try {
    const prompt = req.body.prompt;
    const completion = await generateData(prompt);
    res.json({ completion });
  } catch (error) {
    console.error('Error completing text:', error);
    res.status(500).send('Error: could not access chatGPT');
  }
});

app.post('/api-query', async (req, res) => {
  try {
    const query_result = await serverAPIquery(req.body);
    res.json({query_result});
  } catch (error) {
    console.error('Error completing API query', error);
    res.status(500).send('Error: could not access python API from server; '+error);
  }
})

const server = https.createServer(credentials, app).listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
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
