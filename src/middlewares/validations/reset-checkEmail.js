import Joi from '@hapi/joi';

const checkEmailValidation = (req, res, next) => {
  const schema = Joi.object({
    email: Joi.string()
      .min(8)
      .regex(/[a-zA-Z]/)
      .required()
      .email()
      .messages({
        'string.base': res.__('Email name must be string'),
        'string.empty': res.__('Please fill in your email'),
        'string.min': res.__('email must be atleast {#limit} characters long'),
        'any.required': res.__('email is required')
      })
  });
  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({ err: error.details[0].message });
  }
  next();
};
export default checkEmailValidation;
