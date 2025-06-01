const express = require("express");
const { register, login } = require("../controllers/authController");
const asyncErrorHandler = require("../middlewres/asyncErrorHandler");
const authRouter = express.Router();

authRouter.post("/register", asyncErrorHandler(register));
authRouter.post("/login", asyncErrorHandler(login));

module.exports = authRouter;