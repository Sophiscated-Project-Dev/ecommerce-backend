const Product = require("../models/Product");
const cloudinary = require("cloudinary").v2;
const fs = require("fs");
const { BadRequestError, NotFoundError } = require("../errors");
const { StatusCodes } = require("http-status-codes");
const Review = require("../models/Review");

//create product
const createProduct = async (req, res) => {
  req.body.user = req.user.userId;
  const {} = req.body;
  const product = await Product.create(req.body);
  res.status(StatusCodes.CREATED).json({ product });
};

const getAllProducts = async (req, res) => {
  const { search, category, sort } = req.query;
  let queryObject = {};
  if (search) {
    queryObject.name = { $regex: search, $options: "i" };
  }
  if (category) {
    queryObject.category = category;
  }
  let sortProducts = Product.find(queryObject);
  if (sort === "latest") {
    sortProducts = sortProducts.sort("-createdAt");
  }
  if (sort === "oldest") {
    sortProducts = sortProducts.sort("createdAt");
  }
  const page = Number(req.query.page) || 1;
  const limit = 7;
  const skip = (page - 1) * limit;

  sortProducts = sortProducts.skip(skip).limit(limit);
  const sortedProducts = await sortProducts;
  res.status(StatusCodes.OK).json({ product: sortedProducts });
};

//get single product
const getSingleProduct = async (req, res) => {
  const { id: productId } = req.params;
  const product = await Product.findOne({ _id: productId }).populate({
    path: "reviews",
    populate: [{ path: "user", select: "firstName lastName" }],
    select: "-createdAt -updatedAt",
  });
  if (!product) {
    throw new NotFoundError(`product with this id: ${productId} not found`);
  }
  res.status(StatusCodes.OK).json({ product });
};

const deletProduct = async (req, res) => {
  const { id: productId } = req.params;
  const product = await Product.findOne({ _id: productId });
  if (!product) {
    throw new NotFoundError(`product with this id: ${productId} not found`);
  }
  await product.remove();
  res.status(StatusCodes.OK).json({ product });
};

//update product
const updateProduct = async (req, res) => {
  const { id: productId } = req.params;
  const updatedProduct = await Product.findOneAndUpdate(
    { _id: productId },
    req.body,
    {
      new: true,
      runValidators: true,
    }
  );
  if (!updatedProduct) {
    throw new BadRequestError(
      `failed to update product with the id: ${productId}`
    );
  }
  res.status(StatusCodes.OK).json({ product: updatedProduct });
};

//route for product image upload
const uploadImage = async (req, res) => {
  const image = req.files.image;
  if (!image.mimetype.startsWith("image")) {
    throw new BadRequestError("please upload image");
  }
  const result = await cloudinary.uploader.upload(image.tempFilePath, {
    use_filename: true,
    unique_filename: false,
    folder: "file-upload",
  });
  fs.unlinkSync(image.tempFilePath);
  res.status(StatusCodes.OK).json({ image: { src: result.secure_url } });
};

//top ranked products
const getTopRankProducts = async (req, res) => {
  const products = await Product.aggregate([
    {
      $match: {
        averageRating: {
          $gte: 4,
        },
        numberOfReviews: {
          $gte: 4,
        },
      },
    },
  ]);
  if (!products) {
    throw new NotFoundError("no top ranked products");
  }
  res.status(StatusCodes.OK).json({ topRanks: products });
};

//top brand
const getTopBrands = async (req, res) => {
  const brands = await Product.aggregate([
    {
      $group: {
        _id: {
          brand: "$brand",
        },
        count: {
          $sum: 1,
        },
      },
    },
    {
      $addFields: {
        brandName: "$_id.brand",
      },
    },
    {
      $project: {
        brandName: 1,
        _id: 0,
      },
    },
  ]);
  if (!brands) {
    throw new NotFoundError("no top brands");
  }
  res.status(StatusCodes.OK).json({ topBrands: brands });
};

const getNewArrival = async (req, res) => {
  const newArrival = await Product.aggregate([
    {
      $addFields: {
        year: {
          $year: "$createdAt",
        },
        month: {
          $month: "$createdAt",
        },
        week: {
          $week: "$createdAt",
        },
      },
    },
    {
      $sort: {
        week: -1,
        year: -1,
        month: -1,
      },
    },
  ]);
  const queryWeek = newArrival[0].week;
  const month = new Date().getMonth() + 1;
  const currentYear = new Date().getFullYear();
  const computedNewArrival = newArrival.filter((value) => {
    return (
      value.year === currentYear &&
      value.month === month &&
      value.week === queryWeek
    );
  });
  if (!computedNewArrival) {
    throw new NotFoundError("no new arrival");
  }
  res.status(StatusCodes.OK).json({ newArrival: computedNewArrival });
};
module.exports = {
  uploadImage,
  createProduct,
  getAllProducts,
  getSingleProduct,
  updateProduct,
  deletProduct,
  getTopRankProducts,
  getTopBrands,
  getNewArrival,
};
