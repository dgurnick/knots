const express = require('express');
const bodyParser = require('body-parser');
const socketIo = require('socket.io');
const http = require('http');
const router = require('./router');
require('dotenv').config();

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.use(bodyParser.json({ limit: '50mb' }));
app.use((req, res, next) => {
  req.io = io;
  next();
});

app.use('/', router);
const PORT = 4321; // Random number that's unikely to clash with other apps

server.listen(PORT, () => console.log(`Knot server running on port ${PORT}`));

io.on('connection', () => {
  console.log('Socket connected!');
});

io.on('disconnect', () => {
  console.log('Socker disconnected');
});
