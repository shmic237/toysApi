const Joi = require("joi");


exports.validateToy = (toyBody) =>{
    const toyJoiSchema = Joi.object({
        name: Joi.string().min(2).max(99).required(),
        info: Joi.string().min(3).max(300).required(),
        category: Joi.string().min(3).max(50).required(),
        img_url: Joi.string().allow(null, "").max(500),
        price: Joi.number().min(1).max(9999).required()
    })
    return toyJoiSchema.validate(toyBody);
}

exports.validPatchToy = (toyBody) =>{
    const toyJoiSchema = Joi.object({
        name: Joi.string().min(2).max(99),
        info: Joi.string().min(3).max(300),
        category: Joi.string().min(3).max(50),
        img_url: Joi.string().allow(null, "").max(500),
        price: Joi.number().min(1).max(9999)
    })
    return toyJoiSchema.validate(toyBody);
}