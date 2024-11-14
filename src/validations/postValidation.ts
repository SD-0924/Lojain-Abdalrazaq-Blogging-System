import Joi from 'joi';

// * Schema Implementation * //
const postValidationSchema = Joi.object({
    title: Joi.string().min(3).max(50).required(),
    content: Joi.string().min(6).required(),
    userID: Joi.number().integer().positive().required(),
});






// * Functions Implementation * //
const validateCreatePost = (postData: any) => {
    return postValidationSchema.validate(postData);
};


export{
    validateCreatePost
}