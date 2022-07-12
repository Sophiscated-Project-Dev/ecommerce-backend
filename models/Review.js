const mongoose = require("mongoose");
const Product = require("./Product");
const { Schema, model } = mongoose;
/**const Product = require('../models/Product')*/

const reviewSchema = new Schema(
  {
    title: {
      type: String,
      trim: true,
      required: [true, "Please provide review title"],
      maxlength: 100,
    },
    rating: {
      type: Number,
      min: 1,
      max: 5,
      required: [true, "please provide rating"],
    },
    comment: {
      type: String,
      required: [true, "please provide your comment"],
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    product: {
      type: Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
  },
  { timestamps: true }
);

reviewSchema.index({ product: 1, user: 1 }, { unique: true });

reviewSchema.statics.averageRating = async function (productId) {
  const ratingAverage = await this.aggregate([
    { $match: { product: productId } },
    {
      $group: {
        _id: null,
        ratingAverage: { $avg: "$rating" },
        numberOfReviews: { $sum: 1 },
      },
    },
  ]);
  try {
    //can also use this.model("Product")
    await Product.findOneAndUpdate(
      { _id: productId },
      {
        averageRating: Math.ceil(ratingAverage[0]?.ratingAverage || 0),
        numberOfReviews: ratingAverage[0]?.numberOfReviews,
      }
    );
  } catch (error) {
    console.log(error);
  }
};

reviewSchema.post("save", async function () {
  await this.constructor.averageRating(this.product);
});

reviewSchema.post("remove", async function () {
  await this.constructor.averageRating(this.product);
});

module.exports = model("Review", reviewSchema);
