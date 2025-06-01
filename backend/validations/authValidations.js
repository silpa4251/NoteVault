const Joi = require("joi");

const registerValidation = (data) => {
  const schema = Joi.object({
    name: Joi.string().min(3).max(30).required(),
    password: Joi.string().min(3)
  });

  return schema.validate(data);
};

const loginValidation = (data) => {
  const schema = Joi.object({
    name: Joi.string().required(),
    password: Joi.string().min(3).required(),
  });

  return schema.validate(data);
};

module.exports = { registerValidation, loginValidation };