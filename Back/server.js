const http = require("http");
const app = require("./app");
const dotenv = require("dotenv");
const socketIo = require("socket.io");
const mongoose = require("mongoose");

dotenv.config({ path: "./config.env" });

const { HOST, PORT = 3000, DATABASE_CONNECTION } = process.env;

const server = http.createServer(app);

const io = socketIo(server);

mongoose.connect(DATABASE_CONNECTION).then(() => {
  console.log("Database connected successfully");
});

server.listen(PORT, HOST, () => {
  console.log(`Server is running on ${HOST} and port ${PORT}`);
});
