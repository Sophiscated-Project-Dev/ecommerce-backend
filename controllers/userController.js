const User = require("../models/User");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError } = require("../errors/index");
const { createToken, userToken, addTokonToCookie } = require("../utils/index");
const bcrypt = require("bcryptjs");



//register user
const register = async (req, res) => {
  const { firstName, lastName, email, phoneNumber, password, comfirmPassword } =
    req.body;
  if (
    !firstName ||
    !lastName ||
    !email ||
    !phoneNumber ||
    !password ||
    !comfirmPassword
  ) {
    throw new BadRequestError("Please fill al fields");
  }

  const emailAlreadyExists = await User.findOne({ email });
  if (emailAlreadyExists) {
    throw new BadRequestError("Email already exists");
  }

  // first registered user is an admin
  const isFirstAccount = (await User.countDocuments({})) === 0;
  const role = isFirstAccount ? "admin" : "user";

  const user = await User.create({
    firstName,
    lastName,
    email,
    phoneNumber,
    password,
    comfirmPassword,
    role,
  });
  const tokenUser = userToken(user);
  const token = createToken({ payload: tokenUser });
  addTokonToCookie({ res, user: tokenUser });
  res.status(StatusCodes.CREATED).json({ user: token });
};

//login user
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new BadRequestError("provide email and password");
  }
  const user = await User.findOne({ email });
  if (!user) {
    throw new BadRequestError("invalid details");
  }
  const verifyPassword = await user.comparePasswords(password);
  if (!verifyPassword) {
    throw new BadRequestError("invalid password");
  }
  const tokenUser = userToken(user);
  const token = createToken({ payload: tokenUser });
  addTokonToCookie({ res, user: tokenUser });
  res.json({ user: token });
};

//update user
const updateUser = async (req, res) => {
  const user = await User.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  res.status(200).json({
    success: true,
    data: user,
  });
};

module.exports = { register, loginUser, updateUser };
