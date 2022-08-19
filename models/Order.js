const mongoose = require("mongoose");
const { model, Schema } = mongoose;

const singleOrderSchema = new Schema({
  name: { type: String, required: true },
  image: { type: String, required: true },
  price: { type: Number, required: true },
  amount: { type: Number, required },
  product: { type: Schema.Types.ObjectId, ref: "Product", required: true },
});

const orderSchema = new Schema(
  {
    tax: {
      type: Number,
      required: true,
    },
    shippingFee: {
      type: Number,
      required: true,
    },
    subtotal: {
      type: Number,
      required: true,
    },
    total: {
      type: Number,
      required: true,
    },
    orderItems: [singleOrderSchema],
    status: {
      type: String,
      enum: ["pending", "failed", "paid", "delivered", "canceled"],
      default: "pending",
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    trc_ref: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = model("Order", orderSchema);
