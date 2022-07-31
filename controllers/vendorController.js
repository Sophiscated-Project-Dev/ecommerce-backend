const Vendor = require("../models/Vendor");
const VendorReview = require("../models/VendorReview");
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
  const vendor = await Vendor.create(req.body);
  const user = { firstName: vendor.firstName, _id: vendor._id, role: "vendor" };
  const tokenUser = userToken(user);
  const token = createToken({ payload: tokenUser });
  addTokonToCookie({ res, user: tokenUser });
  res.status(StatusCodes.CREATED).json({ token });
};

//create vendor review
const createVendorReview = async (req, res) => {
  const { vendor: vendorId } = req.body;
  const isVendorValid = await Vendor.findOne({ _id: vendorId });

  if (!isVendorValid) {
    throw new NotFoundError(`vendor with the id: ${vendorId} not found`);
  }
  const reviewExist = await VendorReview.findOne({
    vendor: vendorId,
    user: req.user.userId,
  });
  if (reviewExist) {
    throw new BadRequestError("Review already submitted");
  }
  req.body.user = req.user.userId;
  const review = await VendorReview.create(req.body);
  res.status(StatusCodes.CREATED).json({ review });
};

module.exports = { registerVendor, createVendorReview };
