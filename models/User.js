const mongoose = require("mongose");
const bcrypt = require("bcryptjs");
const validator = require("validator");
const { model, Schema } = mongoose;

const userSchema = Schema(
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
    phoneNubmer: {
      type: String,
      required: [true, "please provide phone number"],
      validate: {
        validator: validator.isMobilePhone,
        message: "please provide a valid mobile number",
      },
    },
    pasword: {
      type: String,
      minLength: 8,
      required: [true, "please provide password"],
    },
    comfirmPasword: {
      type: String,
      minLength: 8,
      required: [true, "please provide password"],
    },
    role: {
      type: String,
      required: [true, "please provide a role"],
      enum: ["admin", "user"],
      default: "user",
    },
  },
  { timestamps: true }
);

userSchema.pre("save", async function () {
  const salt = await bcrypt.genSalt(10);
  if (this.pasword === this.comfirmPasword) {
    this.password = await bcrypt.hash(this.password, salt);
    this.comfirmPasword = await bcrypt.hash(this.comfirmPasword, salt);
  }
});

userModel.methods.comparePasswords = async function (userPassword) {
  return await bcrypt.compare(userPassword, this.password);
};

module.exports = model("User", userSchema);

//first name, last name, email, phone number, password, confirm password
