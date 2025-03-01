const jwt = require("jsonwebtoken");

exports.generateToken = (data, res) => {
  const { SECRET_KEY } = process.env;
  
  const token = jwt.sign(data, SECRET_KEY);

  res.cookie("token", token, {
    maxAge: 3600000,
    secure: false,
    httpOnly: true,
    sameSite: "lax",
    path: "/",
  });
};
