const dotenv = require("dotenv");
const mongoose = require("mongoose");
const server = require("./lib/socket.io");

dotenv.config({ path: "./config.env" });

const { HOST, PORT = 3000, DATABASE_CONNECTION } = process.env;

mongoose.connect(DATABASE_CONNECTION).then(() => {
  console.log("Database connected successfully");
});

server.listen(PORT, HOST, () => {
  console.log(`Server is running on ${HOST} and port ${PORT}`);
});
