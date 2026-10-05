const { celebrate, Joi } = require("celebrate");

const validateSignup = celebrate({
  body: Joi.object().keys({
    name: Joi.string().trim().min(2).max(30).required(),
    email: Joi.string().trim().email().required(),
    password: Joi.string().required(),
  }),
});

const validateLogin = celebrate({
  body: Joi.object().keys({
    email: Joi.string().trim().email().required(),
    password: Joi.string().required(),
  }),
});

const validateUpdateCurrentUser = celebrate({
  body: Joi.object().keys({
    name: Joi.string().trim().min(2).max(30).required(),
  }),
});

const validateProjectRequest = celebrate({
  body: Joi.object().keys({
    name: Joi.string().trim().required(),
    email: Joi.string().trim().email().required(),
    projectType: Joi.string().allow("").optional(),
    material: Joi.string().allow("").optional(),
    description: Joi.string().trim().required(),
  }),
});

const validateRequestId = celebrate({
  params: Joi.object().keys({
    requestId: Joi.string().hex().length(24).required(),
  }),
});

module.exports = {
  validateSignup,
  validateLogin,
  validateUpdateCurrentUser,
  validateProjectRequest,
  validateRequestId,
};
