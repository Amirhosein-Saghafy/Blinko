const express = require("express");
const path = require("path");
const chatController = require("../controllers/chat");
const authController = require("../controllers/auth");

const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "/../", "uploads"));
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const fileExtension = file.mimetype.slice(
      file.mimetype.lastIndexOf("/") + 1
    );
    cb(null, `${file.fieldname}-${uniqueSuffix}.${fileExtension}`);
  },
});

const upload = multer({ storage: storage });

const router = express.Router();

router.use(authController.authentication);

router.get("/all/:id", chatController.getAll);
router.get("/last/:id", chatController.getLastMessage);
router.get("/unseen/:id", chatController.getUnseenMessages);
router.patch("/seen/:id", chatController.setSeenMessages);
router.post("/send", upload.single("image"), chatController.sendMessage);

module.exports = router;
