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

router.get('/profile/:id', async (req: Request, res: Response) => {
    await userController.getUserById(req, res);
})

router.delete('/delete/:id', async (req: Request, res: Response) => {
    await userController.deleteUserById(req, res);
})

router.put('/update/:id', async (req: Request, res: Response) => {
    await userController.updateUserById(req, res);
})

export default router;