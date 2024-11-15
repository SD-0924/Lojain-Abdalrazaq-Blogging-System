import { Request, Response } from 'express';
import { handleError } from '../utils/errorHandler'; 
import commentService from '../services/commentService';
import * as commentValidator from '../validations/commentValidation';

// /api/posts/:postId/comments
const createComment = async(req: Request, res: Response) =>{

    try{
        // validate the input post id in the paramter and the body of the request
        const {error: postID} = commentValidator.validatePostID(req.params);
        const {error: bodyError} = commentValidator.validateCreateComment(req.body);
        // if there is an error in the post id or the body of the request, return the error
        if(postID){
            return handleError(req, res, postID.details[0].message, 422);
        }else if(bodyError){
            return handleError(req, res, bodyError.details[0].message, 422);
        }

        // parsing the post id to a number
        const postId = Number(req.params.postId);

        // comment data
        const commentData = {
                ...req.body, // the comment content and user id
                postID: postId, // the post id to which the comment belongs
            };

        // call the service to create the comment
        const comment = await commentService.createComment(commentData);

        // if the comment is not created, return the error
        if(comment == null){
            return handleError(req, res, 'Post or User not found.', 404);
        }

        return res.status(201).json({ success: true, data: comment });
    
    }catch(err){
        return handleError(req, res, 'Error in creating comment', 500);
    }
};

// get comments of a specific post
// /api/posts/:postId/comments
const getCommentsByPostId = async(req: Request, res: Response) =>{
    try{
        // validate the input post id in the paramter
        const {error} = commentValidator.validatePostID(req.params);
        if(error){
            return handleError(req, res, error.details[0].message, 422);
        }
        // parsing the post id to a number
        const postId = Number(req.params.postId);

        // calling the service to get all comments of a specific post
        const comments = await commentService.getCommentsByPostId(postId);

        if(comments.length == 0){
            return handleError(req, res, 'No comments found.', 404);
        }

        // return the response with the comments
        return res.status(200).json({ success: true, data: comments });

    }catch(err){
        return handleError(req, res, 'Error in getting comments.', 500);
    }
};


export{
    createComment,
    getCommentsByPostId
}