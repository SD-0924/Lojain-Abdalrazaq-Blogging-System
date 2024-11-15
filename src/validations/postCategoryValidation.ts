import JOI from 'joi';

// * Schema Implementation * //
const postCategoryValidationSchema = JOI.object({
    name: JOI.string().required(),
});

const postID = JOI.object({
    postID: JOI.number().integer().positive().required(),
});

// * Functions Implementation * //
const validateCreateCategoryPost = (categoryData: any) => {
    return postCategoryValidationSchema.validate(categoryData);
};

const validatePostID = (postId: any) => {
    return postID.validate(postId);
};

// * Exporting the functions * //
export{
    validatePostID,
    validateCreateCategoryPost
}