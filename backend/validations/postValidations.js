const Joi = require("joi");

const postValidation = (data) => {
    const schema = Joi.object({
        title: Joi.string().min(4).required(),
        description: Joi.string().min(10).max(500).required(),
    });
    return schema.validate(data);
};

module.exports = postValidation;