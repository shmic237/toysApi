const Joi = require("joi");

exports.validLogin = (userBody) =>{
    const userJoiSchema = Joi.object().keys({
        password: Joi.string().required(),
        email: Joi.string().email({tlds: {allow: ['com']}}).error(() => Error('Email is not valid'))
    })
    return userJoiSchema.validate(userBody)
}

exports.validRegister = (userBody) =>{
    const userJoiSchema = Joi.object().keys({
        firstName: Joi.string().required(),
        lastName: Joi.string().required(),
        password: Joi.string().min(4).max(20).required(),
        email: Joi.string().email({ tlds: { allow: ['com'] } }).required().error(() => Error('Email is not valid')),
        
    })
    return userJoiSchema.validate(userBody)
}

