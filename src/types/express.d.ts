import * as express from 'express';

declare global {
    namespace Express {
        interface Request {
            user?: {
            userID: number;
            userName: string;
            email: string;
            };
        }
    }
}