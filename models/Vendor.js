const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const validator = require("validator");
const { model, Schema } = mongoose;

const vendorSchema = Schema(
  {
    firstName: {
      type: String,
      required: [true, "please provide first name"],
      minLength: 3,
      trim: true,
    },
    lastName: {
      type: String,
      required: [true, "please provide last name"],
      minLength: 3,
      trim: true,
    },
    email: {
      type: String,
      required: [true, "please provide email"],
      validate: {
        validator: validator.isEmail,
        message: "provide valid email",
      },
      unique: true,
    },
    businessName: {
      type: String,
      required: [true, "please provide business name"],
      minLength: 4,
      trim: true,
    },
    phoneNumber: {
      type: String,
      required: [true, "please provide phone number"],
      validate: {
        validator: validator.isMobilePhone,
        message: "please provide a valid mobile number",
      },
    },
    password: {
      type: String,
      minLength: 8,
      required: [true, "please provide password"],
    },
    comfirmPassword: {
      type: String,
      minLength: 8,
      required: [true, "please provide password"],
    },
  },
  { timestamps: true }
);

vendorSchema.pre("save", async function () {
  const salt = await bcrypt.genSalt(10);
  if (this.password === this.comfirmPassword) {
    this.password = await bcrypt.hash(this.password, salt);
    this.comfirmPassword = await bcrypt.hash(this.comfirmPassword, salt);
  }
});

vendorSchema.methods.comparePasswords = async function (userPassword) {
  return await bcrypt.compare(userPassword, this.password);
};

module.exports = model("Vendor", vendorSchema);

//first name, last name, email, phone number, password, confirm password
