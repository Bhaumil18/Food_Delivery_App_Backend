const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const codes = require("http-status-codes");
const CustomApiError = require("../errors/CustomApiError");
const { validationResult } = require("express-validator");

const FetchUser = async (req, res) => {
  res.status(200).json({ msg: "User found.", user: req.user });
};

const createUser = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    if (errors.errors[0].path === "email") {
      throw new CustomApiError("Invalid email...!", 400);
    } else if (errors.errors[0].path === "password") {
      throw new CustomApiError("Weak Password...!", 400);
    } else {
      throw new CustomApiError("Name must be provided...!", 400);
    }
  }

  const { name, email, password, address, city, pincode } = req.body;
  const findUser = await User.findOne({ email: email });
  if (findUser) {
    throw new CustomApiError("User already exist.", 400);
  }

  const hashPassword = await bcrypt.hash(password, 10);
  const result = await User.create({
    name: name,
    email: email,
    password: hashPassword,
    address: address,
    city: city,
    pincode: pincode,
  });
  res.status(codes.OK).json({ msg: "User created successfully" });
};

const Login = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    if (errors.errors[0].path === "email") {
      throw new CustomApiError("Invalid email...!", 400);
    } else if (errors.errors[0].path === "password") {
      throw new CustomApiError("Incorrect password...!", 400);
    }
  }

  const { email, password } = req.body;

  const token = jwt.sign({ email }, process.env.SECRET_KEY);

  const findUser = await User.findOne({ email: email });
  if (!findUser) {
    throw new CustomApiError("User not exist...!", 400);
  }

  const check = await bcrypt.compare(password, findUser.password);
  if (!check) {
    throw new CustomApiError("Incorrect password...!", 400);
  }
  res
    .status(200)
    .json({ msg: "Logged in successfully.", token: token, user: findUser });
};

const UpdateUser = async (req, res) => {
  const { name, email, address, city, pincode } = req.body;
  console.log(req.body);

  const findUser = await User.findOne({ email: email });
  if (name != "") findUser.name = name;
  if (address != "") findUser.address = address;
  if (city != "") findUser.city = city;
  if (pincode != "") findUser.pincode = pincode;
  await findUser.save();
  res
    .status(200)
    .json({ msg: "User profile updated successfully.", user: findUser });
};

module.exports = { createUser, Login, FetchUser, UpdateUser };
