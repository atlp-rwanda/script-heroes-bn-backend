import Joi from '@hapi/joi';

// eslint-disable-next-line import/prefer-default-export
export const createRating = (req, res, next) => {
  const schema = Joi.object({
    accomodationId: Joi.number()
      .required()
      .messages({
        'string.empty': res.__('Id of an accomodation cannot be empty'),
        'any.required': res.__('Id of an accomodation is required')
      }),
    ratingValue: Joi.number()
      .integer()
      .min(1)
      .max(5)
      .required()
      .messages({
        'string.empty': res.__('Rating value cannot be empty'),
        'any.required': res.__('Rating value is required'),
      }),
  });

  const { error } = schema.validate(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });
  return next();
};

export const updateRating = (req, res, next) => {
  const schema = Joi.object({
    ratingValue: Joi.number()
      .integer()
      .min(1)
      .max(5)
      .required()
      .messages({
        'string.empty': res.__('Rating value cannot be empty'),
        'any.required': res.__('Rating value is required'),
      }),
  });
  const { error } = schema.validate(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });
  return next();
};
