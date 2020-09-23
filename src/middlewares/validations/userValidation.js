import Joi from '@hapi/joi';

export const signupValidations = (req, res, next) => {
  const schema = Joi.object({
    firstName: Joi.string()
      .min(3)
      .regex(/[a-zA-Z]/)
      .required()
      .messages({
        'string.base': res.__('First name must be string'),
        'string.empty': res.__('Please fill in your first name'),
        'string.pattern.base': res.__('First name must contain letters only'),
        'string.min': res.__(
          'First name must be atleast {#limit} characters long'
        ),
        'any.required': res.__('First Name is required')
      }),
    lastName: Joi.string()
      .min(3)
      .regex(/[a-zA-Z]/)
      .required()
      .messages({
        'string.base': res.__('Last name must be string'),
        'string.empty': res.__('Please fill in your last name'),
        'string.pattern.base': res.__('Last name must contain letters only'),
        'string.min': res.__(
          'Last name must be atleast {#limit} characters long'
        ),
        'any.required': res.__('Last Name is required')
      }),
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
      }),
    phoneNumber: Joi.number()
      .min(8)
      .required()
      .messages({
        'number.base': res.__('Phone Number contain numbers'),
        'number.empty': res.__('Please fill in your Phone Number'),
        'nunmber.min': res.__(
          'Phone Number must be atleast {#limit} characters long'
        ),
        'any.required': res.__('Phone Number is required')
      }),
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
      })
  });
  const { error } = schema.validate(req.body);
  if (error) return res.status(400).send({ error: error.details[0].message });
  return next();
};

export const loginValidation = (req, res, next) => {
  const schema = Joi.object({
    email: Joi.string()
      .email()
      .trim()
      .required()
      .messages({
        'string.email': res.__('Email should look like test@email.com'),
        'any.required': res.__('Please fill in the email input'),
        'string.empty': res.__("Email field can't empty")
      }),
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
      })
  });
  const { error } = schema.validate(req.body);
  if (error) return res.status(400).send({ error: error.details[0].message });
  return next();
};
