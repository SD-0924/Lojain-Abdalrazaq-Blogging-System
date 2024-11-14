import { Request, Response } from 'express';
import { handleError } from '../utils/errorHandler'; 
import UserService from '../services/userService';  
import { validateCreateUser } from '../validations/userValidation';

// create a new user endpoint
const createUser = async(req: Request, res: Response) => {
    try {
        // validate input data
        const { error } = validateCreateUser(req.body);
        if (error) {
            // if there is an error while validating the input data, return an error response
            // exmaple: "email is required", "password must be minimum of 6 characters"
            return handleError(req, res, error.details[0].message, 400);
        }
        // call service to create user
        const user = await UserService.createUser(req.body);
        return res.status(201).json({ success: true, user });
    } catch (err) {
        return handleError(req, res, 'Error creating user', 500);
    }
};

// delete a user endpoint

export { createUser };