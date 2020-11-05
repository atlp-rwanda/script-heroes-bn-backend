import Joi from '@hapi/joi';

export default (req, res, next) => {
  const schema = Joi.object({
    comment: Joi.string()
      .min(4)
      .trim()
      .empty()
      .required()
      .messages({
        'string.base': res.__('Comment should be string'),
        'string.empty': res.__("Comment input can't be empty"),
        'any.required': res.__('Comment is required')
      })
  });
  const { error } = schema.validate(req.body);
  if (error) return res.status(400).send({ error: error.details[0].message });
  return next();
};
