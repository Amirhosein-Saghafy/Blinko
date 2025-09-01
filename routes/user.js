const express = require("express");
const userController = require("../controllers/user");
const authController = require("../controllers/auth");
const multer = require("multer");
const path = require("path");

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '/../', "uploads"));
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const fileExtension = file.mimetype.slice(file.mimetype.lastIndexOf('/') + 1);
    cb(null, `${file.fieldname}-${uniqueSuffix}.${fileExtension}`);
  },
});

const upload = multer({ storage });

router.post("/signup", userController.signup);
router.get("/logout", userController.logout);

router.use(authController.authentication);

router.post("/login", userController.login);
router.post(
  "/profile",
  upload.single("profile-image"),
  userController.updateProfile
);
router.get("/all", userController.getAllUsers);

module.exports = router;
