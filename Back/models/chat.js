const mongoose = require("mongoose");

const chatSchema = new mongoose.Schema({
  senderId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  receiverId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  content: {
    type: String,
    required: true,
  },
  seen: {
    type: Boolean,
    required: true,
  },
  postedAt: {
    type: Date,
    default: new Date(),
  },
});

const chatModel = mongoose.model("chat", chatSchema);

module.exports = chatModel;