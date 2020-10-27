import Joi from '@hapi/joi';

const messageValidation = (req, res, next) => {
  const schema = Joi.object({
    message: Joi.string()
      .trim()
      .required()
      .messages({
        'string.base': res.__('message must be string'),
        'string.empty': res.__('message must not be empty'),
        'any.required': res.__('message is required')
      })
  });
  const { error } = schema.validate(req.body);
  if (error) return res.status(400).send({ error: error.details[0].message });
  return next();
};

export default messageValidation;
