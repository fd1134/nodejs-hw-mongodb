import Joi from 'joi';

export const createContactSchema = Joi.object({
  name: Joi.string().min(3).max(20).required().messages({
    'string.base': 'Username should be a string', 
    'string.min': 'Username should have at least {#limit} characters',
    'string.max': 'Username should have at most {#limit} characters',
    'any.required': 'Username is required',
  }),
  email: Joi.string().email(),
  phoneNumber: Joi.string().pattern(/^[0-9]{10}$/).required(),
  contactType: Joi.string()
    .valid('work', 'home', 'personal')
    .default('personal').required(),
  isFavourite: Joi.boolean().default(false),
});