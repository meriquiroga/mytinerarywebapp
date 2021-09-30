const joi = require('joi')

const validator = (req, res, next) => {
    const schema = joi.object({
        name: joi.string().trim().min(2).required().pattern(RegExp('[a-zA-Z]$')).messages({'string.min': 'Your name seems to be too short. ', 'string.pattern.base': 'Your name should only use letters. '}),
        surname: joi.string().trim().min(2).required().pattern(RegExp('[a-zA-Z]$')).messages({'string.min': 'Your surname seems to be too short. ', 'string.pattern.base': 'Your surname should only use letters. '}),
        email: joi.string().trim().min(2).email().required().messages({'string.email': "That doesn't seem to be a valid email address. Please, check it. "}),
        password: joi.string().trim().min(3).required().messages({'string.min': 'Your password length must be at least 3 characters long. '}),
        img: joi.string().trim().required(),
        country: joi.string().trim().required(),
        google: joi.boolean()
    })

    const validation = schema.validate(req.body, {abortEarly: false})
    console.log(validation.error)
    if (!validation.error) {
        next()
    } else {
        res.json({success: false, errors: validation.error.details})
    }
    
}

module.exports = validator