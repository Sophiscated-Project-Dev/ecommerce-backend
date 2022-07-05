const jsonwebtoken = require("jsonwebtoken");

const createToken = ({ payload }) => {
  return jsonwebtoken.sign(payload, process.env.SECRET, {
    expiresIn: process.env.EXPIRATION,
  });
};

//verify token created
const decodeToken = (token) => {
  return jsonwebtoken.verify(token, process.env.SECRET);
};

//add token tocookie
const addTokonToCookie = ({ res, user }) => {
  const token = createToken({ payload: user });
  const cookieExpiration = 1000 * 60 * 60 * 24; //24hrs for now
  res.cookie("token", token, {
    httpOnly: true,
    expires: Date.now() + cookieExpiration,
    secure: process.env.NODE_ENV === "production",
    signed: true,
  });
};

module.exports = { decodeToken, createToken, addTokonToCookie };
