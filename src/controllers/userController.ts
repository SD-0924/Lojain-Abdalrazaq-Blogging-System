import { Request, Response } from 'express';
import { handleError } from '../utils/errorHandler'; 
import UserService from '../services/userService';  
import * as userValidator from '../validations/userValidation';
import userService from '../services/userService';

// create a new user endpoint - SignUp Endpoint - JWT done
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

        // call the service to create the user and generate the JWT
        const { user , token } = await UserService.createUserAndGenerateToken(req.body);

        return res.status(201).json({ success: true, message: "User Created successfully and stored in the Database.", token: token });

    } catch (err) {
        return handleError(req, res, 'Error in creating user', 500);
    }
}

// Login User - JWT done
const loginUser = async(req: Request, res: Response) =>{
    try{
        // Validate input data
        const { error } = userValidator.validateLogin(req.body);
        if (error) {
            return handleError(req, res, error.details[0].message, 422);
        }

        const { email, password } = req.body;

        // Finding the User By email
        const token = await userService.loginUserAndGenerateToken(email, password);
        if (!token) {
            return handleError(req, res, `User with ${email} Not Found or Incorrect Password`, 401);
        }
        
        // Sending the Token with the Response
        return res.status(200).json({success: true, message: "Login successful", token: token});
    }catch(err){
        return handleError(req, res, "Error logging in", 500); 
    }
}

// delete a user by id endpoint - Delete Profile - JWT done
const deleteUserById = async(req: Request, res: Response) =>{
    try{
        const { error } = userValidator.validateUserId(req.body.userID);
        if(error){
            return handleError(req, res, error.details[0].message, 422);
        }
        const userNumber = parseInt(req.body.userID);
        const user = await UserService.deleteUser(userNumber);
        /**
         * This if statement since in some cases, the user delete his account, but try to reuse the old taken while it is NOT expired yet
         * race condition (where the token is valid, but the user is no longer in the system) and is why we should handle this error. 
         */
        if(!user){
            return handleError(req, res, `There is no user with id number: ${userNumber}, the Delete operation failed.`, 404);
        }
        return res.status(200).json({ success: true, message: `User with id number: ${userNumber} has been deleted successfully.` });

    }catch(err){
        return handleError(req, res, `Error in deleting user by id ${req.params}`, 500);
    }
}

// update user by id endpoint - Update Profile - JWT done
const updateUserById = async(req: Request, res: Response) =>{
    try{
        const { error: idError } = userValidator.validateUserId(req.body.userID);
        const { userID, ...updateData } = req.body;  // exculding the userID from the body to not be updated
        const { error: updateError } = userValidator.validateUpdateUser(updateData);

        if(idError){
            return handleError(req, res, idError.details[0].message, 422);
        }

        if(updateError){
            return handleError(req, res, updateError.details[0].message, 422);
        }

        const userNumber = parseInt(req.body.userID); 
        const updatedUser = await UserService.updateUser(userNumber, updateData);

        if(!updatedUser){
            return handleError(req, res, `There is no user with id number: ${userNumber}, the Update operation failed.`, 404);
        }
        return res.status(200).json({ success: true, message: `User with id number: ${userNumber} has been updated successfully.` });

    }catch(err){
        return handleError(req, res, 'Error in updating user by id.', 500);
    }
}

// get a user by id endpoint - JWT done
const getUserById = async(req: Request, res: Response) =>{
    try{
        const { error } = userValidator.validateUserId(req.body.userID);
        if(error){
            return handleError(req, res, error.details[0].message, 422);
        }

        const userNumber = parseInt(req.body.userID);
        const user = await UserService.getUserById(userNumber);

        if (!user) {
            return handleError(req, res, `There is no user with id number: ${userNumber}`, 404);
        }

        return res.status(200).json({ success: true, data: user });

    }catch(err){
        return handleError(req, res, 'Error in getting user by id.', 500);
    }
}

export{ 
    createUser, 
    getUserById,
    deleteUserById,
    updateUserById,
    loginUser
};