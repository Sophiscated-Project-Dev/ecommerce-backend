const jsonwebtoken = require("jsonwebtoken");

const createToken = ({ payload }) => {
  return jsonwebtoken.sign(payload, process.env.SECRET, {
    expiresIn: process.env.EXPIRATION,
  });
};

const decodeToken = (token) => {
  return jsonwebtoken.verify(token, process.env.SECRET);
};

module.exports = { decodeToken, createToken };
