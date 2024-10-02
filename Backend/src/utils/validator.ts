// Utils/validator

import Joi, { ObjectSchema, ValidationResult } from 'joi'
import { mainModule } from 'process'

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


const validateCountry = Joi.object({
    name: Joi.string().min(5).max(50).required(),
    initials : Joi.string().min(1).max(2).required(),
    created_at: Joi.date().greater('now'),
    updated_at: Joi.date().greater('now'),
})

const validatorCompany = validator(validateCompany)
const validatorCountry = validator(validateCountry)

export { validatorCompany , validatorCountry}
