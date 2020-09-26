import Joi from '@hapi/joi';

export const roleAssignValidation = (req, res, next) => {
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
    userRole: Joi.string()
      .trim()
      .required()
      .messages({
        'any.required': res.__('Please fill in the userRole input'),
        'string.empty': res.__("userRole field can't be empty")
      })
  });
  const { error } = schema.validate(req.body);
  if (error) return res.status(400).send({ error: error.details[0].message });
  return next();
};

export const roleValidation = (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string()
      .trim()
      .required()
      .messages({
        'any.required': res.__('Please fill in the name input'),
        'string.empty': res.__("name field can't be empty")
      }),
    description: Joi.string()
      .trim()
      .required()
      .messages({
        'any.required': res.__('Please fill in the description input'),
        'string.empty': res.__("description field can't be empty")
      })
  });
  const { error } = schema.validate(req.body);
  if (error) return res.status(400).send({ error: error.details[0].message });
  return next();
};
