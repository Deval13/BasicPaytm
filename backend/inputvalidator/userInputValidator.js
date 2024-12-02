const zod = require('zod');

userValidation = zod.object({
    username: zod.string().email(),
    password: zod.string(),
    firstName: zod.string(),
    lastName : zod.string()
})

module.exports = { userValidation }