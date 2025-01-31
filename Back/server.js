const express = require("express");
const http = require("http");
const dotenv = require("dotenv");
const socketIo = require("socket.io");

dotenv.config({ path: "./config.env" });

const { HOST, PORT } = process.env;

const app = express();

const server = http.createServer(app);

const io = socketIo(server);

server.listen(PORT, HOST, () => {
  console.log(`Server is running on ${HOST} and port ${PORT}`);
});
