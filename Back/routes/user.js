const express = require("express");
const userController = require("../controllers/user");
const authController = require("../controllers/auth");

const router = express.Router();

router.post("/signup", userController.signup);
router.get("/logout", userController.logout);

router.use(authController.authentication);

router.post("/login", userController.login);
router.get("/all", userController.getAllUsers);

module.exports = router;
