import Joi from '@hapi/joi';

const signupValidations = (data) => {
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
    email: Joi.string()
      .min(8)
      .regex(/[a-zA-Z]/)
      .required()
      .email()
      .messages({
        'string.base': 'Email name must be string',
        'string.empty': 'Please fill in your email',
        'string.min': 'email must be atleast {#limit} characters long',
        'any.required': 'email is required'
      }),
    phoneNumber: Joi.number().min(8).required().messages({
      'number.base': 'Phone Number contain numbers',
      'number.empty': 'Please fill in your Phone Number',
      'nunmber.min': 'Phone Number must be atleast {#limit} characters long',
      'any.required': 'Phone Number is required'
    }),
    password: Joi.string().min(8).required().messages({
      'string.base': 'Password must be string',
      'string.empty': 'Please fill in your Password',
      'string.min': 'Password must be atleast {#limit} characters long',
      'any.required': 'Password is required'
    })
    // confirmPassword: Joi.ref('Password')
  });
  return schema.validate(data);
};
export default signupValidations;
