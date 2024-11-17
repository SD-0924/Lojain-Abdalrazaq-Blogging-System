import { Request, Response } from 'express';
import { handleError } from '../utils/errorHandler'; 
import postService from '../services/postService';
import * as postValidator from '../validations/postValidation';

// create a new post endpoint
const createPost = async(req: Request, res: Response) => {

    try{
        // firstly, i have to validate the input data
        const { error } = postValidator.validateCreatePost(req.body);
        if(error){
            return handleError(req, res, error.details[0].message, 422);
        }

        // call the service to create a post
        const post = await postService.createPost(req.body);
        if(!post){
            return handleError(req, res, `User with id ${req.body.userId} does not exist`, 404);
        }

        // return the response with the created post
        return res.status(201).json({ success: true, data: post });

    }catch(err){
        return handleError(req, res, 'Error in creating post', 500);
    }

};

// get all posts endpoint
const getPosts = async(req: Request, res: Response) => {
    try{
        // call the service to get all posts
        const posts = await postService.getAllPosts();
        if(!posts){
            return handleError(req, res, 'No posts found in the Database.', 404);
        }

        // return the response with the posts
        return res.status(200).json({ success: true, data: posts });

    }catch(err){
        return handleError(req, res, 'Error in getting posts.', 500);
    }
};

// get post by id endpoint
const getPostById = async(req: Request, res: Response) => {
    try{
        // validate the input data
        const { error } = postValidator.validatePostID(req.params);
        if(error){
            return handleError(req, res, error.details[0].message, 422);
        }
        const postId = Number(req.params.id);

        // call the service to get post by id
        const post = await postService.getPostDetails(Number(postId));
        if(!post){
            return handleError(req, res, `Post with ID ${postId} not found.`, 404);
        }

        // return the response with the post
        return res.status(200).json({ success: true, data: post });

    }catch(err){
        return handleError(req, res, 'Error in getting post.', 500);
    }
};

// update post by id endpoint
const updatePost = async(req: Request, res: Response) =>{
    try{

        // validate the input data in the request body and the post id
        const { error: postID } = postValidator.validatePostID(req.params);
        const { error: updatePost } = postValidator.validateUpdatePost(req.body);

        if(postID){
            return handleError(req, res, postID.details[0].message, 422);
        }

        if(updatePost){
            return handleError(req, res, updatePost.details[0].message, 422);
        }

        // parsing the post id to a number
        const postId = Number(req.params.id);
        const { userID, ...updateData } = req.body;

        const post = await postService.getPostById(postId);
        if (!post) {
            return handleError(req, res, `Post with ID ${postId} not found.`, 404);
        }
        if (post.userID !== userID) {
            return handleError(req, res, 'You are not authorized to update this post.', 403);
        }
        // call the service to update the post
        const updatedPost = await postService.updatePost(postId, updateData);
        if (!updatedPost) {
            return handleError(req, res, 'Failed to update post.', 500);
        }

        return res.status(200).json({ success: true, data: updatedPost });
    }catch(err){
        return handleError(req, res, 'Error in updating post.', 500);
    }
}

// delete post by id endpoint
const deletePost = async(req: Request, res: Response) =>{
    try{

        // validate the input data
        const { error } = postValidator.validateDeletePost(req.body);
        if(error){
            return handleError(req, res, error.details[0].message, 422);
        }

        const { id , userID } = req.body;
        const post = await postService.getPostById(id); // checking if the post exists
        
        if (!post) {
            return handleError(req, res, `Post with ID ${id} not found.`, 404);
        }

        // example: the userID is same as the user in the token, however, in the Database of Posts, the user is differnt, so we canrt delete it
        if (post.userID !== userID) {
            return handleError(req, res, 'You are not authorized to delete this post.', 403);
        }

        await postService.deletePost(id);
        return res.status(200).json({ success: true, message: `Post with id number: ${id} has been deleted successfully.` });

    }catch(err){
        return handleError(req, res, 'Error in deleting post.', 500);
    }
}

// export the createPost function
export { 
    createPost,
    getPosts,
    getPostById,
    updatePost,
    deletePost
};