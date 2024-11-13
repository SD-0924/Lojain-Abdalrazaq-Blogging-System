import { Request, Response } from 'express';
import { logError } from './errorLogger'; 

const handleError = (req: Request, res: Response, message: string, statusCode: number) => {

    // print the error message using the logger middleware
    logError(message);
    // return the error message with the status code in the response
    return res.status(statusCode).json({ success: false, message });
};

export { handleError };