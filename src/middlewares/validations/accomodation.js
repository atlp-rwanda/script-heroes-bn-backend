import Joi from '@hapi/joi';

export default (req, res, next) => {
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
        'string.base': res.__('Location should be string'),
        'string.empty': res.__("Location input can't be empty"),
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
    roomType: Joi.string()
      .required()
      .trim()
      .messages({
        'string.empty': res.__('At least one room is required'),
        'any.required': res.__('At least one room is required')
      }),
    photoUrl: Joi.string()
      .required()
      .uri()
      .messages({
        'string.base': res.__('Please provide a valid url'),
        'string.empty': res.__('Provide image for your accomodation'),
        'string.uri': res.__('Please provide a valid url'),
        'any.required': res.__('Image is required')
      })
  });
  const { error } = schema.validate(req.body);
  if (error) return res.status(400).send({ error: error.details[0].message });
  return next();
};
