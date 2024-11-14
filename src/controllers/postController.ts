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

// export the createPost function
export { 
    createPost,
    getPosts
};