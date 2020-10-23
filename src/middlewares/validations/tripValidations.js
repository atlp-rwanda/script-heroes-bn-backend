/* eslint-disable require-jsdoc */
import Joi from '@hapi/joi';

class TripsValidation {
  static async multiCity(req, res, next) {
    const schema = Joi.object({
      trips: Joi.array()
        .items(
          Joi.object({
            origin: Joi.number()
              .required()
              .messages({
                'number.base': res.__('origin must be a number'),
                'number.empty': res.__('origin must not be empty'),
                'any.required': res.__('origin is required')
              }),
            destination: Joi.number()
              .required()
              .messages({
                'number.base': res.__('destination must be a number'),
                'number.empty': res.__('destination must not be empty'),
                'any.required': res.__('destination is required')
              }),
            from: Joi.string()
              .min(8)
              .regex(/^\d{4}-(0?[1-9]|1[012])-(0?[1-9]|[12][0-9]|3[01])$/)
              .required()
              .messages({
                'string.base': res.__('from must be a string'),
                'string.empty': res.__('from must not be empty'),
                'string.min': res.__(
                  'from must be at least {#limit} characters long'
                ),
                'any.required': res.__('from is required'),
                'string.pattern.base': res.__(
                  "from format must be '2000-01-01' or '2000-1-1'"
                )
              }),
            till: Joi.string()
              .min(8)
              .regex(/^\d{4}-(0?[1-9]|1[012])-(0?[1-9]|[12][0-9]|3[01])$/)
              .required()
              .messages({
                'string.base': res.__('till must be a string'),
                'string.empty': res.__('till must not be empty'),
                'string.min': res.__(
                  'till must be at least {#limit} characters long'
                ),
                'any.required': res.__('till is required'),
                'string.pattern.base': res.__(
                  "till format must be '2000-01-01' or '2000-1-1'"
                )
              })
          })
            .required()
            .messages({
              'object.base': res.__('A single trip must be an object')
            })
        )
        .min(2)
        .required()
        .messages({
          'array.includesRequiredUnknowns': res.__('trips must not be empty'),
          'array.base': res.__('trips must be an array'),
          'array.min': res.__('must contain at least 2 trips'),
          'any.required': res.__('trips are required')
        })
    });
    const { error } = schema.validate(req.body);
    if (error) return res.status(400).send({ error: error.details[0].message });
    return next();
  }

  static async oneway(req, res, next) {
    const schema = Joi.object({
      origin: Joi.number()
        .required()
        .messages({
          'number.base': res.__('origin must be a number'),
          'number.empty': res.__('origin must not be empty'),
          'any.required': res.__('origin is required')
        }),
      destination: Joi.number()
        .required()
        .messages({
          'number.base': res.__('destination must be a number'),
          'number.empty': res.__('destination must not be empty'),
          'any.required': res.__('destination is required')
        }),
      from: Joi.string()
        .min(8)
        .regex(/^\d{4}-(0?[1-9]|1[012])-(0?[1-9]|[12][0-9]|3[01])$/)
        .required()
        .messages({
          'string.base': res.__('from must be a string'),
          'string.empty': res.__('from must not be empty'),
          'string.min': res.__(
            'from must be at least {#limit} characters long'
          ),
          'any.required': res.__('from is required'),
          'string.pattern.base': res.__(
            "from format must be 'YY-MM-DD'"
          )
        }),
      till: Joi.string()
        .min(8)
        .regex(/^\d{4}-(0?[1-9]|1[012])-(0?[1-9]|[12][0-9]|3[01])$/)
        .required()
        .messages({
          'string.base': res.__('till must be a string'),
          'string.empty': res.__('till must not be empty'),
          'string.min': res.__(
            'till must be at least {#limit} characters long'
          ),
          'any.required': res.__('till is required'),
          'string.pattern.base': res.__(
            "till format must be 'YY-MM-DD'"
          )
        }),
        accomodationId: Joi.number()
        .required()
        .messages({
          'number.base': res.__('accomodationId must be a number'),
          'number.empty': res.__('accomodationId must not be empty'),
          'any.required': res.__('accomodationId is required')
        }),
        travelReasons: Joi.string()
        .min(3)
        .required()
        .messages({
          'string.base': res.__('travelReason must be a string'),
          'string.empty': res.__('travelReason must not be empty'),
          'string.min': res.__('travelReason must be at least {#limit} characters long'),
          'any.required': res.__('travelReason is required'),
        })
    });
    const { error } = schema.validate(req.body);
    if (error) return res.status(400).send({ error: error.details[0].message });
    return next();
  }
}

export default TripsValidation;
