const fs = require('fs');
const http = require('http');
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
const port = 4000;
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
    res.status(500).send('Error: could not access API');
  }
})

const server = http.createServer(app).listen(port, () => {
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
