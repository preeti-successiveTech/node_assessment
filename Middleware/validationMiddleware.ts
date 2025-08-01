import Joi from "joi";

export const validate = Joi.object({
    name : Joi.string().required(),
    age : Joi.number().required(),
    email: Joi.string().required(),
    grade : Joi.string().required()
});