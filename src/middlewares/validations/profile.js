import Joi from '@hapi/joi';

export const completeprofileValidation = (req, res, next) => {
  const schema = Joi.object({
    gender: Joi.string().valid('Male', 'Female').required().messages({
      'string.base': 'Gender must contain letters only',
      'string.empty': 'Please fill in your gender',
      'any.required': 'Gender is required'
    }),
    birthdate: Joi.date().required().messages({
      'date.base': 'Birthdate must be a date',
      'date.empty': 'Please fill in your birthdate',
      'any.required': 'Birthdate is required'
    }),
    language: Joi.string()
      .min(3)
      .regex(/[a-zA-Z]/)
      .required()
      .messages({
        'string.base': 'Language name must contain letters only',
        'string.empty': 'Please fill in your language',
        'string.min': 'Language name must be atleast {#limit} characters long',
        'any.required': 'Language name is required'
      }),
    currency: Joi.string().required().messages({
      'string.base': 'Currency must contain letters only',
      'string.empty': 'Please fill in your currency',
      'any.required': 'Currency is required'
    }),
    country: Joi.string().required().messages({
      'string.base': 'Country must contain letters only',
      'string.empty': 'Please fill in your country',
      'any.required': 'Country is required'
    }),
    department: Joi.string().min(2).required().messages({
      'string.base': 'Department must contain letters only',
      'string.empty': 'Please fill in your department',
      'string.min': 'Department must be atleast {#limit} characters long',
      'any.required': 'Department is required'
    }),
    linemanager: Joi.number().required().messages({
      'string.base': 'Line manager must contain numbers only',
      'string.empty': 'Please fill in the line manager',
      'string.min': 'Line manager must be atleast {#limit} characters long',
      'any.required': 'Line manager is required'
    })
  });
  const { error } = schema.validate(req.body);
  if (error) return res.status(400).send({ error: error.details[0].message });
  return next();
};
export const updateprofileValidation = (req, res, next) => {
  const schema = Joi.object({
    firstName: Joi.string()
      .min(3)
      .regex(/[a-zA-Z]/)
      .required()
      .messages({
        'string.base': 'First name must be string',
        'string.empty': 'Please fill in your first name',
        'string.pattern.base': 'First name must contain letters only',
        'string.min': 'First name must be atleast {#limit} characters long',
        'any.required': 'First Name is required'
      }),
    lastName: Joi.string()
      .min(3)
      .regex(/[a-zA-Z]/)
      .required()
      .messages({
        'string.base': 'Last name must be string',
        'string.empty': 'Please fill in your last name',
        'string.pattern.base': 'Last name must contain letters only',
        'string.min': 'Last name must be atleast {#limit} characters long',
        'any.required': 'Last Name is required'
      }),
    phoneNumber: Joi.number().min(8).required().messages({
      'number.base': 'Phone Number contain numbers',
      'number.empty': 'Please fill in your Phone Number',
      'nunmber.min': 'Phone Number must be atleast {#limit} characters long',
      'any.required': 'Phone Number is required'
    }),
    gender: Joi.string()
      .min(4)
      .max(6)
      .regex(/[a-zA-Z]/)
      .required()
      .messages({
        'string.base': 'Gender must contain letters only',
        'string.empty': 'Please choose your gender',
        'string.pattern.base': 'Gender must contain letters only',
        'string.min': 'Gender must not be less than {#limit} characters long',
        'string.max': 'Gender must be not be over {#limit} characters long',
        'any.required': 'Gender is required'
      }),
    birthdate: Joi.date().required().messages({
      'date.base': 'Birthdate must be a date',
      'date.empty': 'Please fill in your birthday',
      'any.required': 'Birthdate is required'
    }),
    language: Joi.string()
      .min(3)
      .regex(/[a-zA-Z]/)
      .required()
      .messages({
        'string.base': 'Language name must contain letters only',
        'string.empty': 'Please fill in your language',
        'string.min': 'Language must be atleast {#limit} characters long',
        'any.required': 'Language is required'
      }),
    currency: Joi.string().required().messages({
      'string.base': 'Currency must contain letters only',
      'string.empty': 'Please fill in your currency',
      'any.required': 'Currency is required'
    }),
    country: Joi.string().min(2).required().messages({
      'string.base': 'Country must contain letters only',
      'string.empty': 'Please fill in your country',
      'any.required': 'Country is required'
    }),
    department: Joi.string().min(2).required().messages({
      'string.base': 'Department must contain letters only',
      'string.empty': 'Please fill in your department',
      'string.min': 'Department must be atleast {#limit} characters long',
      'any.required': 'Department is required'
    }),
    linemanager: Joi.number().required().messages({
      'string.base': 'Line manager must contain numbers only',
      'string.empty': 'Please fill in the line manager',
      'any.required': 'Line manager is required'
    })
  });
  const { error } = schema.validate(req.body);
  if (error) return res.status(400).send({ error: error.details[0].message });
  return next();
};
