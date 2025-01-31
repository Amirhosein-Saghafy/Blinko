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
      res.status(200).json({ message: "Login successful" });
    } else {
      res.status(401).json({ message: "Invalid credentials" });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};
