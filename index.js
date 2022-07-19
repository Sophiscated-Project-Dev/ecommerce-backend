const express = require("express");
const app = express();
require("dotenv").config();
require("express-async-errors");

//other packages
const cookieParser = require("cookie-parser");
const cloudinary = require("cloudinary").v2;
const fileUpload = require("express-fileupload");
const cors = require("cors");
const helmet = require("helmet");
const xss = require("xss-clean");

//swagger ui
const swaggerUi = require("swagger-ui-express");
const YAML = require("yamljs");
const swaggerDocument = YAML.load("./swagger.yaml");
//const swaggerDocument = require("./swagger.json");
app.get("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

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
const reviewRouter = require("./routes/reviewRouter");
const vendorRouter = require("./routes/vendorRouter");

const notFound = require("./middleware/not-found");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser(process.env.SECRET));
app.use(fileUpload({ useTempFiles: true }));
app.use(helmet());
app.use(cors());
app.use(xss());

//app routes
app.use("/api/v1/users", userRouter);
app.use("/api/v1/vendors", vendorRouter);
app.use("/api/v1/products", productRouter);
app.use("/api/v1/reviews", reviewRouter);
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
