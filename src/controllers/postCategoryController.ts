import { Request, Response } from 'express';
import { handleError } from '../utils/errorHandler'; 
import postCategoryService from '../services/postCategoryService';
import * as postCategoryValidator from '../validations/postCategoryValidation';

const createCategoryPost = async(req: Request, res: Response) => {

    try{
        // validating the input data
        const { error: categoryName } = postCategoryValidator.validateCreateCategoryPost(req.body);
        const { error: postID } = postCategoryValidator.validatePostID(req.params);
        if(categoryName){
            return handleError(req, res, categoryName.details[0].message, 422);
        }
        if(postID){
            return handleError(req, res, postID.details[0].message, 422);
        }

        // calling the service to create category for post
        // it will check the post id, if it exists then it will create the category either it was exists or not
        const category = await postCategoryService.createCategoryForPost(Number(req.params.postID), req.body.name);

        if(!category){
            return handleError(req, res, `Post with id ${req.params.postID} does not exist`, 404);
        }

        // return the response with the created category
        return res.status(201).json({ success: true, data: category });

    }catch(err: any){
        return handleError(req, res, 'Error in creating category for post', 500);
    }
};

const getCategoriesPost = async(req: Request, res: Response) => {
    try{
        // implementation






    }catch(err){
        return handleError(req, res, 'Error in getting categories for post', 500);
    }
};



export{
    createCategoryPost,
    getCategoriesPost
}