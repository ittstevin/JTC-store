const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const { instrument } = require('@socket.io/admin-ui');

const app = express();
const server = http.createServer(app);

const io = socketIo(server, {
  cors: {
    origin: ['http://localhost:3000', 'http://admin.socket.io'],
    methods: ["GET", "POST"]
  }
});

const userIo = io.of('/user');

userIo.use((socket, next) => {
  if (socket.handshake.auth.token) {
    socket.username = getUserNameFromToken(socket.handshake.auth.token);
    next();
  } else {
    next(new Error('Please send token'));
  }
});

userIo.on('connection', (socket) => {
  console.log("Connected to user namespace:", socket.username);

  // You can handle user-specific events here if needed
});

io.on('connection', (socket) => {
  console.log("New client connected:", socket.id);

  socket.on('send-message', (message, room) => {
    if (room === '') {
      socket.broadcast.emit('receive-message', message);
    } else {
      socket.to(room).emit('receive-message', message);
    }
  });

  socket.on('join-room', (room, cb) => {
    socket.join(room);
    cb(`Joined room: ${room}`);
  });

  socket.on("ping", n => console.log("Ping:", n));
  socket.on('disconnect', () => {
    console.log("Client disconnected:", socket.id);
  });
});

// Start the server
const PORT = process.env.PORT || 4000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// Admin UI Instrumentation
instrument(io, { auth: false });

function getUserNameFromToken(token) {
  // Implement your token decoding logic to extract the username
  return token; // This is just a placeholder. Adjust as necessary.
}
