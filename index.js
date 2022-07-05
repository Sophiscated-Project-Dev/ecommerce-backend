const express = require("express");
const app = express();
require("dotenv").config();
require("express-async-errors");

//other packages
const cookieParser = require("cookie-parser");

//database
const cnonnectDb = require("./db/connectdb");

//routers
const userRouter = require("./routes/userRouter");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser(process.env.SECRET));

//app routes
app.use("/api/v1/users", userRouter);

//test route
app.get("/", (req, res, next) => {
  res.send("This is the home page");
});

const PORT = process.env.PORT || 5000;
cnonnectDb();
app.listen(PORT, () => {
  console.log(`App listening on port: ${PORT}`);
});
