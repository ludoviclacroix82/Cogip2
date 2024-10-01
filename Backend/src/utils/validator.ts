// Utils/validator

import Joi, { ObjectSchema, ValidationResult } from 'joi'

const validator = (schema: ObjectSchema) => (payload: any): ValidationResult =>
    schema.validate(payload, { abortEarly: false })

const validateCompany = Joi.object({
    name: Joi.string().min(5).max(50).required(),
    type_id: Joi.number().required(),
    country_id: Joi.number().required(),
    tva: Joi.string().max(50).required(),
    created_at: Joi.date().greater('now'),
    updated_at: Joi.date().greater('now'),
})

const validatorCompany = validator(validateCompany)

export { validatorCompany }
