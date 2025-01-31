const http = require("http");
const app = require("./app");
const dotenv = require("dotenv");
const socketIo = require("socket.io");

dotenv.config({ path: "./config.env" });

const { HOST, PORT = 3000 } = process.env;

const server = http.createServer(app);

const io = socketIo(server);

server.listen(PORT, HOST, () => {
  console.log(`Server is running on ${HOST} and port ${PORT}`);
});
