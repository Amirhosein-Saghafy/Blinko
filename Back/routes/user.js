const express = require("express");
const userController = require("../controllers/user");

const router = express.Router();

router.post("/login", userController.login);
router.post("/signup", userController.signup);
router.get("/all", userController.getAllUsers);

module.exports = router;
