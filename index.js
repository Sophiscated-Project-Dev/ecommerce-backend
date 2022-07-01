const express = require("express");
require("dotenv").config();
const cnonnectDb = require("./db/connectdb");

const app = express();

app.get("/", (req, res, next) => {
  res.send("This is the home page");
});

const PORT = process.env.PORT || 5000;
cnonnectDb();
app.listen(PORT, () => {
  console.log(`App listening on port: ${PORT}`);
});
