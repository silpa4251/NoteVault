const { registerService, loginService } = require("../services/authService");
const CustomError = require("../utils/customError");
const { registerValidation, loginValidation } = require("../validations/authValidations");

const register = async (req, res) => {
  const { error } = registerValidation(req.body)
  if (error) throw new CustomError(error.details[0].message, 400);
  
  const data = await registerService(req.body);
  res.status(201).json({ status: "success", data})
};

const login = async (req, res) => {
  const {error} = loginValidation(req.body);
  if (error) throw new CustomError(error.details[0].message, 400);

  const data = await loginService(req.body);
  
  res.status(200).json({  status: "success", data})
};

module.exports = { register, login }