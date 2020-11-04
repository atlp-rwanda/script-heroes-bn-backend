import Joi from '@hapi/joi';

export default (req, res, next) => {
  const schema = Joi.object({
    accomodationId: Joi.number()
      .required()
      .messages({
        'string.empty': res.__('Id of an accomodation cannot be empty'),
        'any.required': res.__('Id of an accomodation is required')
      }),
    roomId: Joi.number()
      .required()
      .messages({
        'string.empty': res.__('Id of a room cannot be empty'),
        'any.required': res.__('Id of a room is required')
      }),
    checkInDate: Joi.string()
      .required()
      .messages({
        'string.empty': res.__('Check-in date cannot be empty'),
        'any.required': res.__('Check-in date is required')
      }),
    checkOutDate: Joi.string()
      .required()
      .messages({
        'string.empty': res.__('Check-out date cannot be empty'),
        'any.required': res.__('CHeck-out date is required')
      }),
  });

  const { error } = schema.validate(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });
  return next();
};
