const express = require("express");
const cors = require("cors");
const user = require("./routes/user");
const chat = require("./routes/chat");
const cookieParser = require("cookie-parser");

const app = express();

app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.static("./uploads"));
app.use(express.static("./build"));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/user", user);
app.use("/chat", chat);
app.all("*", (req, res) => {
  res.redirect("/");
});

module.exports = app;
