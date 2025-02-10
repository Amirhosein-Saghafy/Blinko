const express = require("express");
const cors = require("cors");
const user = require("./routes/user");
const chat = require("./routes/chat");

const app = express();

app.use(cors({ origin: "http://localhost:5173", credentials: true }));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/user", user);
app.use("/chat", chat);

module.exports = app;
