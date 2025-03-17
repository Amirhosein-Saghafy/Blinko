const http = require("http");
const app = require("../app");
const { Server } = require("socket.io");

const server = http.createServer(app);

const io = new Server(server, {
  cors: { origin: "http://localhost:5173" },
  connectionStateRecovery: {},
});

io.on("connection", (socket) => {
  console.log(`A user connected : ${socket.id}`);
  socket.on("disconnect", () => {
    console.log(`User disconnected : ${socket.id}`);
  });
});

module.exports = server;
