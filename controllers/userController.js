const User = require("../models/User");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError } = require("../errors/index");

//all error functions and roken function yet to be created
const register = async (req, res) => {
  const { firstName, lastName, email, phoneNumber, password, comfirmPassword } =
    req.body;
  if (
    firstName ||
    !lastName ||
    !email ||
    !phoneNumber ||
    !password ||
    !comfirmPassword
  ) {
    throw new BadRequestError("provide registration details");
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
  const tokenUser = createTokenUser(user);
  attachCookiesToResponse({ res, user: tokenUser });
  res.status(StatusCodes.CREATED).json({ user: tokenUser });
};
