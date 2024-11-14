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
        const post = await postService.getPostById(Number(postId));
        if(!post){
            return handleError(req, res, 'Post not found.', 404);
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

        // call the service to update the post
        const post = await postService.updatePost(postId, req.body);

        if(!post){
            return handleError(req, res, 'Post or User not found.', 404);
        }

        return res.status(200).json({ success: true, data: post });

    }catch(err){
        return handleError(req, res, 'Error in updating post.', 500);
    }
}

// export the createPost function
export { 
    createPost,
    getPosts,
    getPostById,
    updatePost
};