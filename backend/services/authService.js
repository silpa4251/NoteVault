const User = require("../models/userModel");
const CustomError = require("../utils/customError");
const bcrypt = require("bcryptjs");
const { generateToken } = require("../utils/jwt");

const registerService = async (data) => {
  const { name, password } = data;
  const existingUser = await User.findOne({ name });
  if (existingUser) {
    throw new CustomError("User already exists!", 400);
  }
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  const newUser = new User({ name, password: hashedPassword });
  await newUser.save();
  return { message: "User registered successfully" };
};

const loginService = async (data) => {
  const { name, password } = data;
  const user = await User.findOne({ name });

  if (!user) {
    throw new CustomError("User not found", 400);
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new CustomError("Invalid password", 400);
  }

  const token = generateToken(user._id);

  return {
    message: "user logged in successfully",
    token,
    user: {
      id: user._id,
      name: user.name
    },
  };
};

module.exports = { registerService, loginService } 