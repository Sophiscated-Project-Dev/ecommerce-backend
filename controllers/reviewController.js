const Review = require("../models/Review");
const Product = require("../models/Product");
const { StatusCodes } = require("http-status-codes");
const { NotFoundError, BadRequestError } = require("../errors/index");

const createReview = async (req, res) => {
  const { product: productId } = req.body;
  const isProductValid = await Product.findOne({ _id: productId });

  if (!isProductValid) {
    throw new NotFoundError(`product with the id: ${productId} not found`);
  }
  const reviewExist = await Review.findOne({
    product: productId,
    user: req.user.userId,
  });
  if (reviewExist) {
    throw new BadRequestError("Review already submitted");
  }
  req.body.user = req.user.userId;
  const review = await Review.create(req.body);
  res.status(StatusCodes.CREATED).json({ review });
};

//all reviews
const getAllReviews = async (req, res) => {};

//single review
const getSingleReview = async (req, res) => {};

module.exports = { createReview };
