import { Request, Response } from 'express';
import { handleError } from '../utils/errorHandler'; 
import UserService from '../services/userService';  
import * as userValidator from '../validations/userValidation';

// create a new user endpoint
const createUser = async(req: Request, res: Response) => {
    try {
        // validate input data
        const { error } = userValidator.validateCreateUser(req.body);
        if (error) {
            // if there is an error while validating the input data, return an error response
            // exmaple: "email is required", "password must be minimum of 6 characters"
            return handleError(req, res, error.details[0].message, 422);
        }

        // checking if there is a duplicate user - email or username
        const findDuplicates = await UserService.findDuplicateUser(req.body.email, req.body.userName);
        if(findDuplicates){
            return handleError(req, res, findDuplicates, 400);
        }

        // call the serivce to make sure that the user does not exist
        const user = await UserService.createUser(req.body);
        return res.status(201).json({ success: true, message: "User Created successfully and stored in the Database." });

    } catch (err) {
        return handleError(req, res, 'Error in creating user', 500);
    }
};

// get all users endpoint
const getAllUsers = async(req: Request, res: Response) =>{
    try{
        // i want only to return the user name and email
        const users = await UserService.getAllUsers();

        // in case we dont have users in the database
        if(users.length === 0){
            return handleError(req, res, 'No users found in the Database.', 404);
        }

        return res.status(200).json({ success: true, data: users });

    }catch(err){
        return handleError(req, res, 'Error in getting all users.', 500);
    }
}

// get a user by id endpoint
const getUserById = async(req: Request, res: Response) =>{
    try{
        const { error } = userValidator.validateUserId(req.params);
        if(error){
            return handleError(req, res, error.details[0].message, 422);
        }

        const userNumber = parseInt(req.params.id);
        const user = await UserService.getUserById(userNumber);

        if (!user) {
            return handleError(req, res, `There is no user with id number: ${userNumber}`, 404);
        }

        return res.status(200).json({ success: true, data: user });

    }catch(err){
        return handleError(req, res, 'Error in getting user by id.', 500);
    }
}

// delete a user by id endpoint
const deleteUserById = async(req: Request, res: Response) =>{
    try{
        // validate the input param
        const { error } = userValidator.validateUserId(req.params);
        if(error){
            return handleError(req, res, error.details[0].message, 422);
        }
        // convert the id to a number
        const userNumber = parseInt(req.params.id);
        const user = await UserService.deleteUser(userNumber);

        if(!user){
            return handleError(req, res, `There is no user with id number: ${userNumber}, the Delete operation failed.`, 404);
        }

        return res.status(200).json({ success: true, message: `User with id number: ${userNumber} has been deleted successfully.` });

    }catch(err){
        return handleError(req, res, `Error in deleting user by id ${req.params}`, 500);
    }
}

// update user by id endpoint
const updateUserById = async(req: Request, res: Response) =>{
    try{
        // validate the input param
        const { error: idError } = userValidator.validateUserId(req.params);
        const { error: updateError } = userValidator.validateUpdateUser(req.body);

        if(idError){
            return handleError(req, res, idError.details[0].message, 422);
        }

        if(updateError){
            return handleError(req, res, updateError.details[0].message, 422);
        }

        // parsing the id to a number
        const userNumber = parseInt(req.params.id);
        // call the service to update the user
        const updatedUser = await UserService.updateUser(userNumber, req.body);

        if(!updatedUser){
            return handleError(req, res, `There is no user with id number: ${userNumber}, the Update operation failed.`, 404);
        }
        return res.status(200).json({ success: true, message: `User with id number: ${userNumber} has been updated successfully.` });

    }catch(err){
        return handleError(req, res, 'Error in updating user by id.', 500);
    }
}

export{ 
    createUser, 
    getAllUsers,
    getUserById,
    deleteUserById,
    updateUserById
};