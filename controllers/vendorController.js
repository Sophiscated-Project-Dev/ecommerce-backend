const Vendor = require("../models/Vendor");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError } = require("../errors/index");

const { addTokonToCookie, createToken, userToken } = require("../utils/index");

//register vendor
const registerVendor = async (req, res) => {
  const { email } = req.body;
  const emailAlreadyExists = await Vendor.findOne({ email });
  if (emailAlreadyExists) {
    throw new BadRequestError("Email already exists");
  }
  req.body.role = "vendor";
  const vendor = await Vendor.create(req.body);
  const user = { firstName: vendor.firstName, _id: vendor._id, role: "vendor" };
  const tokenUser = userToken(user);
  const token = createToken({ payload: tokenUser });
  addTokonToCookie({ res, user: tokenUser });
  res.status(StatusCodes.CREATED).json({ token });
};

module.exports = { registerVendor };
