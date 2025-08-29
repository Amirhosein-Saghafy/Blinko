const http = require("http");
const app = require("../app");
const { Server } = require("socket.io");
const chatModel = require("../models/chat");

const server = http.createServer(app);

const io = new Server(server, {
  cors: { origin: "http://localhost:5173" },
  connectionStateRecovery: {},
});

const users = {};

const getReceiverSocketId = (userId) => {
  return users[userId];
};

io.on("connection", (socket) => {
  const isConnected = Object.keys(users).some((userId) => {
    return userId === socket.handshake.auth.userId;
  });

  if (isConnected) return;

  users[socket.handshake.auth.userId] = socket.id;

  io.emit("updateOnlineUsers", users);

  console.log(`A user connected : ${socket.id}`);

  socket.on("seenMessage", async ({ senderId, receiverId }) => {
    await chatModel
      .find({
        receiverId,
        senderId,
        seen: false,
      })
      .updateMany({ seen: true }); 
  });

  socket.on("disconnect", () => {
    delete users[socket.handshake.auth.userId];

    io.emit("updateOnlineUsers", users);

    console.log(`User disconnected : ${socket.id}`);
  });
});

exports.io = io;
exports.server = server;
exports.getReceiverSocketId = getReceiverSocketId;
