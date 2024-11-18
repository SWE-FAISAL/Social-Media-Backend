const http = require("http");
const express = require("express");
const path = require("path");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

// Socket.io
io.on("connection", (socket) => {
  socket.on("user-message", (message) => {
    io.emit("message", message);
  });
});

app.use(express.static(path.resolve("./public")));

app.get("/", (req, res) => {
  return res.sendFile("/public/index.html");
});

server.listen(9000, () => console.log(`Server Started at PORT:9000`));

-----------------------------------// and more ----------------------------------------------------------------------------------------
// Example of Socket.IO: Client-side (HTML/JavaScript):
<script src="/socket.io/socket.io.js"></script>
<script>
    // Connect to the Socket.IO server
    const socket = io();

    // Send a message to the server
    socket.emit('sendMessage', 'Hello Server!');

    // Receive a message from the server
    socket.on('receiveMessage', function(msg) {
        console.log("Message from server: " + msg);
    });
</script>
// Server-side (Node.js using Socket.IO library):

const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

io.on('connection', (socket) => {
    console.log("New client connected");

    // Listen for 'sendMessage' event from client
    socket.on('sendMessage', (msg) => {
        console.log("Received: " + msg);
        // Send a message back to the client
        socket.emit('receiveMessage', "Hello Client!");
    });

    // When a client disconnects
    socket.on('disconnect', () => {
        console.log("Client disconnected");
    });
});

server.listen(3000, () => {
    console.log("Server running on port 3000");
});

// Example of WebSocket:
// Let’s say we have a chat application where messages can be sent in real-time. Client-side (JavaScript):
// Create a new WebSocket connection
const socket = new WebSocket("ws://localhost:8080");

// When the connection is open, send a message
socket.onopen = function(event) {
    socket.send("Hello Server!");
};

// When a message is received from the server
socket.onmessage = function(event) {
    console.log("Message from server: " + event.data);
};

// Handle errors
socket.onerror = function(error) {
    console.log("WebSocket Error: " + error);
};

// Handle connection close
socket.onclose = function(event) {
    console.log("Connection closed");
};
// Server-side (Node.js using WebSocket library):
const WebSocket = require('ws');
const wss = new WebSocket.Server({ port: 8080 });

wss.on('connection', function connection(ws) {
    console.log("New client connected");

    // Send a message to the client
    ws.send("Hello Client!");

    // When the server receives a message from the client
    ws.on('message', function incoming(message) {
        console.log("Received: " + message);
    });
});
// Which one to choose?
// If you need simple, low-level, real-time communication (like in a gaming app or financial data streaming), WebSocket might be enough.
// If you need more features, like automatic reconnection, broadcasting, or handling complex rooms in a chat app, Socket.IO is the better choice.
