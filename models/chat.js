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
    required: false,
    defaultValue: "",
  },
  image: {
    type: String,
    required: false,
    defaultValue: null,
  },
  seen: {
    type: Boolean,
    required: true,
  },
  postedAt: {
    type: Date,
  },
});

const chatModel = mongoose.model("chat", chatSchema);

module.exports = chatModel;
