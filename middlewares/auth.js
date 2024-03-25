const jwt = require("jsonwebtoken");
const CustomApiError = require("../errors/CustomApiError");
const User = require("../models/user");

const authenticationMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Sonu ")) {
    throw new CustomApiError("Token not found", 401);
  }
  try {
    const token = authHeader.split(" ")[1];
    const { email } = jwt.decode(token, process.env.SECRET_KEY);

    const findUser = await User.findOne({ email: email });

    if (!findUser) {
      throw new CustomApiError("User not exist with the existing token.");
    }

    req.user = findUser;
    req.userId = findUser._id;
    next();
  } catch (error) {
    res.status(200).json({ msg: "Internal server error." });
  }
};

module.exports = authenticationMiddleware;
