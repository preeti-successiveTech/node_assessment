import Joi from "joi";

export const validate = Joi.object({
  name: Joi.string().trim().required(),
  age: Joi.number().integer().min(0).required(),
  email: Joi.string().email().required(),
  grade: Joi.string().trim().required()
});