const express = require("express");
const chatController = require("../controllers/chat");

const router = express.Router();

router.get("/all", chatController.getAll);

module.exports = router;
