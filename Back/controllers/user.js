const jwt = require("jsonwebtoken");
const userModel = require("../models/user");

exports.login = async (req, res) => {
  const { SECRET_KEY } = process.env;

  const { userName, password } = req.body;

  try {
    const hashedPassword = jwt.sign(password, SECRET_KEY);

    const user = await userModel.findOne({
      userName,
      password: hashedPassword,
    });

    if (user) {
      res.status(200).json({ message: "Login successful", data: user });
    } else {
      res.status(401).json({ error: "Invalid credentials" });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.signup = async (req, res) => {
  const { SECRET_KEY } = process.env;

  const { userName, password } = req.body;

  try {
    const hashedPassword = jwt.sign(password, SECRET_KEY);

    const user = await userModel.create({
      userName,
      password: hashedPassword,
      profileImage: "profile-default.png",
    });

    if (user) {
      res
        .status(200)
        .json({ message: "Profile created successfully", data: user });
    } else {
      res
        .status(500)
        .json({ error: "Request could not be confirmed, please try again" });
    }
  } catch (error) {
    res.status(500).json({
      error: error.message.includes("duplicate")
        ? "The username is already taken"
        : "Internal server error",
    });
  }
};
