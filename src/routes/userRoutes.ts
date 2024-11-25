import { Router, Request, Response } from 'express'
import * as userController from '../controllers/userController';
import authMiddleware from '../middlewares/authMiddleware';

const router = Router();

// no need for authMiddleware, since everyone can signup
router.post('/signup', async (req: Request, res: Response) => {
    await userController.createUser(req, res)
})

// Login Endpoint
router.post('/login', async (req: Request, res: Response) => {
    await userController.loginUser(req, res)
})

// Delete Profile Endpoint, we have to use the authMiddleware
router.delete('/delete', authMiddleware, async (req: Request, res: Response) => {
    await userController.deleteUserById(req, res);
})

// Edit Porfile information endpoint, we also have to use the authMiddleware
router.put('/update', authMiddleware, async (req: Request, res: Response) => {
    await userController.updateUserById(req, res);
})

// Read Profile info
router.get('/profile', authMiddleware, async (req: Request, res: Response) => {
    await userController.getUserById(req, res);
})


export default router;