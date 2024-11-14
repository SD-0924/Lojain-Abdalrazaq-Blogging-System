import { Request, Response } from 'express';
import { handleError } from '../utils/errorHandler'; 
import postService from 'services/postService';
import * as postValidator from 'validations/postValidation';

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
