const mongoose = require("mongoose");


const connectDb = async (url) => {
  try {
    await mongoose.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`database connected successfully}`);
  } catch (error) {
    console.log(`Failed to connect to database. ${error}`);
    process.exit(1);
  }
};

module.exports = connectDb;
