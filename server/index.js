const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");

const io = new Server(server);
const PORT = 5001;

app.get("/", (req, res) => {
  res.send("Hello sujal!!");
});

io.on("connection", (socket) => {
  console.log("a user connected");
});

server.listen(PORT, () => {
  console.log("server is running on ${PORT}");
});
