const jwt = require("jsonwebtoken");

const generateToken = ( id, role) => {
  return jwt.sign({ id, role }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

const verifyToken = (token) => {
  return jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
};

module.exports = { generateToken, verifyToken };