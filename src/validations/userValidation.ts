import Joi from 'joi';

// defining a schema for creating a user and updating a user
const userValidationSchema = Joi.object({
    userName: Joi.string().min(3).max(50).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
});

// defining a schema for the `id` parameter
const userIdSchema = Joi.object({
    id: Joi.number().integer().positive().required(),
});

// function checks if the input matches the schema for creating a user record
const validateCreateUser = (userData: any) => {
    return userValidationSchema.validate(userData);
};

// function checks if the input matches the schema for the `id` parameter
const validateUserId = (userId: any) => {
    return userIdSchema.validate(userId);
}

export { 
        validateCreateUser,
        validateUserId
    };