import Joi from 'joi';

// defining a schema for creating a user and updating a user
const userValidationSchema = Joi.object({
    userName: Joi.string().min(3).max(50).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
});
// function checks if the input matches the schema for creating a user or updating a user
const validateCreateUser = (userData: any) => {
    return userValidationSchema.validate(userData);
};

export { validateCreateUser };