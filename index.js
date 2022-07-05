const express = require("express");
require("dotenv").config();
require("express-async-errors");
const cnonnectDb = require("./db/connectdb");

const app = express();

//routers
const userRouter = require("./routes/userRouter");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

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
