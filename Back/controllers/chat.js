const chatModel = require("../models/chat");
const userModel = require("../models/user");

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

exports.send = async (req, res) => {
  try {
    const myUser = await userModel.findOne({
      userName: req.userName,
      password: req.password,
    });

    const newChat = {
      senderId: myUser._id,
      receiverId: req.body.receiverId,
      content: req.body.content,
      seen: false,
    };

    const chat = await chatModel.create(newChat);

    res.status(201).json({
      data: chat,
    });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};
