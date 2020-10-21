import Joi from '@hapi/joi';

export const validateHostAccomodation = (req, res, next) => {
  const schema = Joi.object({
    facilityName: Joi.string()
      .min(4)
      .trim()
      .empty()
      .required()
      .messages({
        'string.base': res.__('Name should be string'),
        'string.empty': res.__("Name input can't be empty"),
        'any.required': res.__('Name property is required')
      }),
    locationId: Joi.number()
      .empty()
      .required()
      .messages({
        'number.base': res.__('Please choose location'),
        'number.empty': res.__("Location input can't be empty"),
        'any.required': res.__('Location should be provided')
      }),
    description: Joi.string()
      .min(8)
      .allow('')
      .regex(/[a-zA-Z]/)
      .messages({
        'string.base': res.__('Description should be of type string'),
        'string.min': res.__('Please, provide meaningful description'),
        'string.pattern.base': res.__('Please, provide meaningful description')
      }),
    photoUrl: Joi.string()
      .required()
      .uri()
      .messages({
        'string.base': res.__('Please provide a valid url'),
        'string.empty': res.__('Provide image for your accomodation'),
        'string.uri': res.__('Please provide a valid url'),
        'any.required': res.__('Image is required')
      }),
    roomNumbers: Joi.number()
      .empty()
      .required()
      .messages({
        'number.base': res.__('Please fill room numbers'),
        'number.empty': res.__("Room numbers input can't be empty"),
        'any.required': res.__('Room numbers should be provided')
      }),
    price: Joi.number()
      .empty()
      .required()
      .messages({
        'number.base': res.__('Please fill price'),
        'number.empty': res.__("Price input can't be empty"),
        'any.required': res.__('Price should be provided')
      }),
    services: Joi.string()
      .min(3)
      .allow('')
      .regex(/[a-zA-Z]/)
      .messages({
        'string.base': res.__('Services should be of type string'),
        'string.min': res.__('Please, provide meaningful services'),
        'string.pattern.base': res.__('Please, provide meaningful services')
      }),
    amenities: Joi.string()
      .min(3)
      .allow('')
      .regex(/[a-zA-Z]/)
      .messages({
        'string.base': res.__('Amenities should be of type string'),
        'string.min': res.__('Please, provide meaningful amenities'),
        'string.pattern.base': res.__('Please, provide meaningful amenities')
      })
  });
  const { error } = schema.validate(req.body);
  if (error) return res.status(400).send({ error: error.details[0].message });
  return next();
};
