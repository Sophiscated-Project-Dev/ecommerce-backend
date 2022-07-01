const mongoose = require("mongoose");

const cnonnectDb = async () => {
  try {
    await mongoose.connect(process.env.DATABASE_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`database connected successfully}`);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

module.exports = cnonnectDb;
