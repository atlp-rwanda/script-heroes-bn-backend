import Joi from '@hapi/joi';

export const validateReturnTrip = (req, res, next) => {
  const schema = Joi.object({
    origin: Joi.number()
      .required()
      .messages({
        'number.base': res.__('Please fill your location'),
        'any.required': res.__('Location is required')
      }),
    destination: Joi.number()
      .required()
      .messages({
        'number.base': res.__('Please fill your destination'),
        'any.required': res.__('Destination is required')
      }),
    from: Joi.date()
      .required()
      .messages({
        'date.base': res.__('Please enter a valid date like YYY-MM-DD'),
        'any.required': res.__('Start date is required')
      }),
    till: Joi.date()
      .required()
      .messages({
        'date.base': res.__('Please enter a valid date like YYY-MM-DD'),
        'any.required': res.__('End date is required')
      }),
    travelReasons: Joi.string()
      .required()
      .messages({
        'string.empty': res.__('Please fill your travel reason'),
        'any.required': res.__('Travel reason is required')
      }),
    accomodationId: Joi.number()
      .required()
      .messages({
        'number.base': res.__('Please choose accomodation'),
        'any.required': res.__('Accomodation is required')
      })
  });
  const { error } = schema.validate(req.body);
  if (error) return res.status(400).send({ error: error.details[0].message });
  return next();
};
