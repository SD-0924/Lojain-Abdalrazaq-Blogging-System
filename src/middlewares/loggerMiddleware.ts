import { Request, Response, NextFunction } from 'express';

// Log the request method and URL
export const logger = (req: Request, res: Response, next: NextFunction) => {
    // Log the request method and URL
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    next();  // next middleware
};