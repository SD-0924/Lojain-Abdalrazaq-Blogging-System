import Joi from 'joi';

// * Schema Implementation * //
const postValidationSchema = Joi.object({
    title: Joi.string().min(3).max(50).required(),
    content: Joi.string().min(6).required(),
    userID: Joi.number().integer().positive().required(),
});

const postID = Joi.object({
    id: Joi.number().integer().positive().required(),
});

const postUpdateValidationSchema = Joi.object({
    title: Joi.string().min(3).max(50).optional(),
    content: Joi.string().min(6).optional(),
    userID: Joi.number().integer().positive().required(),
}).or('title', 'content');

const pstDeleteValidationSchema = Joi.object({
    id: Joi.number().integer().positive().required(),
    userID: Joi.number().integer().positive().required(),
});

// * Functions Implementation * //
const validateCreatePost = (postData: any) => {
    return postValidationSchema.validate(postData);
};

const validatePostID = (postId: any) => {
    return postID.validate(postId);
};

const validateUpdatePost = (postData: any) => {
    return postUpdateValidationSchema.validate(postData);
};

const validateDeletePost = (postData: any) =>{
    return pstDeleteValidationSchema.validate(postData);
};

// * Exporting the functions * //
export{
    validateCreatePost,
    validatePostID,
    validateUpdatePost,
    validateDeletePost
}