import JOI from 'joi';

// * Schema Implementation * //
const commentValidationSchema = JOI.object({
    content: JOI.string().min(3).required(),
    userID: JOI.number().integer().positive().required(),
});

const postID = JOI.object({
    postID: JOI.number().integer().positive().required(),
});

// * Functions Implementation * //
const validateCreateComment = (commentData: any) => {
    return commentValidationSchema.validate(commentData);
};

const validatePostID = (postId: any) => {
    return postID.validate(postId);
};

// * Exporting the functions * //
export{
    validateCreateComment,
    validatePostID
}