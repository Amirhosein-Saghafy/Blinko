const jwt = require("jsonwebtoken");

exports.authentication = async (req, res, next) => {
  try {
    const { token } = req.cookies;
    const { SECRET_KEY } = process.env;
    const requestUrl = req.originalUrl;
    let userCredentials = null;    

    if (requestUrl === "/user/login") {
      if (!token) {
        next();
        return;
      }

      userCredentials = jwt.verify(token, SECRET_KEY);

      if (!userCredentials) {
        next();
        return;
      }
    } else {
      if (!token) {
        res.status(401).json({ error: "Invalid credentials" });
        return;
      }

      userCredentials = jwt.verify(token, SECRET_KEY);

      if (!userCredentials) {
        res.status(401).json({ error: "Invalid credentials" });
        return;
      }
    }

    req.userName = userCredentials.userName;
    req.password = userCredentials.password;

    next();
  } catch (error) {
    res.status(500).json({ error });
  }
};
