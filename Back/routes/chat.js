const express = require("express");
const chatController = require("../controllers/chat");
const authController = require("../controllers/auth");

const router = express.Router();

router.use(authController.authentication);

router.get("/all", chatController.getAll);

module.exports = router;
