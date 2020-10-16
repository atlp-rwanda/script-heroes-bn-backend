import Joi from '@hapi/joi';

const location = (req, res, next) => {
  const schema = Joi.object({
    city: Joi.string()
      .min(3)
      .required()
      .messages({
        'string.base': res.__('city must be string'),
        'string.empty': res.__('city must not be empty'),
        'string.min': res.__('city must be atleast {#limit} characters long'),
        'any.required': res.__('city is required')
      }),
    country: Joi.string()
      .min(3)
      .required()
      .messages({
        'string.base': res.__('country must be string'),
        'string.empty': res.__('country must not be empty'),
        'string.min': res.__(
          'country must be atleast {#limit} characters long'
        ),
        'any.required': res.__('country is required')
      })
  });
  const { error } = schema.validate(req.body);
  if (error) return res.status(400).send({ error: error.details[0].message });
  return next();
};

export default location;
