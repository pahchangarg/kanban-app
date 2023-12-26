const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const cors = require("cors");

app.use(cors());
const UID = () => Math.random().toString(36).substring(2, 10);
const tasks = {
  pending: {
    items: [],
  },
  ongoing: {
    items: [],
  },
  completed: {
    items: [],
  },
};

const socketIO = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
  },
});
const PORT = 5001;
app.post("/api/addTask", express.json(), (req, res) => {
  const { stage, title } = req.body;

  if (!stage || !title) {
    return res.status(400).json({ error: "Invalid data" });
  }

  const newTask = {
    id: UID(),
    title: title,
    comments: [],
  };

  tasks[stage].items.push(newTask);
  res.json({ message: "Task added successfully", task: newTask });
});
app.get("/api", (req, res) => {
  res.json(tasks);
});

socketIO.on("connection", (socket) => {
  console.log(`${socket.id} user connected`);
});

server.listen(PORT, () => {
  console.log(`server is running on ${PORT}`);
});
