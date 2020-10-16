import Joi from '@hapi/joi';

const checkPasswordValidation = async (req, res, next) => {
  const schema = await Joi.object({
    password: Joi.string()
      .min(8)
      .required()
      .regex(/^[a-z]{4,}\d+/i)
      .messages({
        'string.base': res.__('Password must be string'),
        'string.empty': res.__('Please fill in your Password'),
        'string.min': res.__(
          'Password must be atleast {#limit} characters long'
        ),
        'any.required': res.__('Password is required'),
        'string.pattern.base': res.__(
          'Password must be at least 5 characters including 4 letters and numbers'
        )
      }),
    confirmPassword: Joi.string()
      .required()
      .messages({
        'string.empty': res.__('Please fill in the confirmation'),
        'any.required': res.__('Confirmation is required')
      })
  });
  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({ err: error.details[0].message });
  }
  next();
};
export default checkPasswordValidation;
