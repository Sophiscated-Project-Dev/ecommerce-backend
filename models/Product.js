const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const productSchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
      required: [true, "please provide product name"],
      maxlength: [80, "name can not be more than 80 characters"],
    },
    price: {
      type: Number,
      required: [true, "please provide product price"],
      default: 0,
    },
    category: {
      type: String,
      required: [true, "please provide product category"],
    },
    description: {
      type: String,
      required: [true, "please provide product category"],
      maxlength: [
        700,
        "product description can not be more than 700 characters",
      ],
    },
    featured: {
      type: Boolean,
      default: false,
    },
    images: {
      type: [String],
      default: ["/uploads/couch.jpeg"],
    },
    company: {
      type: String,
      required: [true, "please provide product company"],
    },
    colors: {
      type: [String],
      default: ["3ddd"],
      required: [true, "please provide product colors"],
    },
    freeShipping: {
      type: Boolean,
      defaultfalse,
    },
    inventory: {
      type: Number,
      required: [true, "provide product inventory"],
      default: 10,
    },
    averageRating: {
      type: Number,
      default: 0,
    },
    numberOfReviews: {
      type: Number,
      default: 0,
    },
    size: {
      type: String,
      default: "size",
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

productSchema.virtual("reviews", {
  ref: "Review",
  localField: "_id",
  foreignField: "product",
  justOne: false,
});

module.exports = model("Product", productSchema);
