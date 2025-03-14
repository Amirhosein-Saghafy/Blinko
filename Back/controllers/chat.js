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

  try {
    const chats = await chatModel.find({
      $or: [{ senderId: user._id }, { receiverId: user._id }],
    });

    res.status(200).json({
      data: chats,
    });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};
