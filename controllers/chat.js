const chatModel = require("../models/chat");
const userModel = require("../models/user");
const socket = require("../lib/socket.io");
const ImageKit = require("imagekit");

const imagekit = new ImageKit({
  publicKey: "public_7VpeEVy2O69CNG7eQp+Dvm7P6kQ=",
  privateKey: "private_u+2hC7h67ni1dqe0Gn+6T3L58bM=",
  urlEndpoint: "https://ik.imagekit.io/469kf2yok1/",
});

exports.getAll = async (req, res) => {
  const user = await userModel.findOne({
    userName: req.userName,
    password: req.password,
  });
  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }

  const userId = req.params.id;

  try {
    const chats = await chatModel.find({
      $or: [
        { senderId: user._id, receiverId: userId },
        { receiverId: user._id, senderId: userId },
      ],
    });

    res.status(200).json({
      data: chats,
    });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.getLastMessage = async (req, res) => {
  const user = await userModel.findOne({
    userName: req.userName,
    password: req.password,
  });
  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }

  const userId = req.params.id;

  try {
    const chat = await chatModel
      .findOne({
        $or: [
          { senderId: user._id, receiverId: userId },
          { receiverId: user._id, senderId: userId },
        ],
      })
      .sort({ postedAt: -1 });

    res.status(200).json({
      data: chat ?? "",
    });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.sendMessage = async (req, res) => {
  try {
    const myUser = await userModel.findOne({
      userName: req.userName,
      password: req.password,
    });

    const message = {
      senderId: myUser._id,
      receiverId: req.body.receiverId,
      content: req.body.content,
      // image: req.file ? req.file.filename : null,
      postedAt: new Date(),
      seen: false,
    };

    if (req.file) {
      try {
        const response = await imagekit.upload({
          file: `https://blinko-pir5.onrender.com/${req.file.filename}`,
          fileName: file.filename,
        });

        message.image = response.url;
      } catch (error) {
        console.log(error);
      }
    }

    const chat = await chatModel.create(message);

    const receiverSocketId = socket.getReceiverSocketId(message.receiverId);

    if (receiverSocketId) {
      socket.io.to(receiverSocketId).emit("newMessage", chat);
    }

    res.status(201).json({
      data: chat,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({ error: "Internal server error" });
  }
};

exports.getUnseenMessages = async (req, res) => {
  const user = await userModel.findOne({
    userName: req.userName,
    password: req.password,
  });
  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }

  const userId = req.params.id;

  try {
    const count = await chatModel
      .find({
        receiverId: user._id,
        senderId: userId,
        seen: false,
      })
      .countDocuments();

    res.status(200).json({
      data: count,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({ error: "Internal server error" });
  }
};

exports.setSeenMessages = async (req, res) => {
  const user = await userModel.findOne({
    userName: req.userName,
    password: req.password,
  });
  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }

  const userId = req.params.id;

  try {
    await chatModel
      .find({
        receiverId: user._id,
        senderId: userId,
        seen: false,
      })
      .updateMany({ seen: true });

    res.sendStatus(200);
  } catch (error) {
    console.log(error);

    res.status(500).json({ error: "Internal server error" });
  }
};
