const express = require("express");
const app = express();
require("dotenv").config();
require("express-async-errors");

//other packages
const cookieParser = require("cookie-parser");
const cloudinary = require("cloudinary").v2;
const fileUpload = require("express-fileupload");

//database
const cnonnectDb = require("./db/connectdb");

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API,
  api_secret: process.env.CLOUD_SECRET,
});

//routers
const userRouter = require("./routes/userRouter");
const productRouter = require("./routes/productRouter");

const notFound = require("./middleware/not-found");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser(process.env.SECRET));
app.use(fileUpload({ useTempFiles: true }));

//app routes
app.use("/api/v1/users", userRouter);
app.use("/api/v1/products", productRouter);

app.use(notFound);

//test route
app.get("/", (req, res, next) => {
  res.send("This is the home page");
});

const PORT = process.env.PORT || 5000;
cnonnectDb();
app.listen(PORT, () => {
  console.log(`App listening on port: ${PORT}`);
});
