const express = require("express");
const cors = require("cors");
const user = require("./routes/user");

const app = express();

app.use(cors({ origin: "http://127.0.0.1:5173", credentials: true }));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/user", user);

module.exports = app;
