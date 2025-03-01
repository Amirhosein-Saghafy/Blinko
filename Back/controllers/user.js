const userModel = require("../models/user");
const bcrypt = require("bcryptjs");
const { generateToken } = require("../lib/utils");

exports.login = async (req, res) => {
  let user = null;

  try {
    if (req.userName && req.password) {
      user = await userModel.findOne({
        userName: req.userName,
        password: req.password,
      });

      if (user) {
        res.status(200).json({ message: "Login successful", data: user });
        return;
      } else {
        res.status(401).json({ error: "Invalid credentials" });
        return;
      }
    } else {
      const userCredentials = req.body;

      user = await userModel.findOne({
        userName: userCredentials.userName,
      });

      if (!user) {
        res.status(401).json({ error: "Invalid credentials" });
        return;
      }

      const hashedPassword = user.password;

      const isValid = await bcrypt.compare(
        userCredentials.password,
        hashedPassword
      );

      if (!isValid) {
        res.status(401).json({ error: "The password is incorrect" });
        return;
      }

      const userData = {
        userName: userCredentials.userName,
        password: hashedPassword,
      };

      generateToken(userData, res);

      res.status(200).json({ message: "Login successful", data: user });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.signup = async (req, res) => {
  const userCredentials = req.body;

  try {
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(userCredentials.password, salt);

    const user = await userModel.create({
      userName: userCredentials.userName,
      password: hashedPassword,
      profileImage: "profile-default.png",
    });

    if (user) {
      const userData = {
        userName: userCredentials.userName,
        password: hashedPassword,
      };

      generateToken(userData, res);

      res
        .status(201)
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

exports.getAllUsers = async (req, res) => {
  const users = await userModel.find().select(["userName", "profileImage"]);
  res.status(200).json({ data: users });
};
