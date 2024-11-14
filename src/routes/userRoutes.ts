import { Router, Request, Response } from 'express'
import * as userController from '../controllers/userController';

const router = Router();

router.post('/', async (req: Request, res: Response) => {
    await userController.createUser(req, res)
})

router.get('/', async (req: Request, res: Response) => {
    await userController.getAllUsers(req, res);
})

router.get('/:id', async (req: Request, res: Response) => {
    await userController.getUserById(req, res);
})

router.delete('/:id', async (req: Request, res: Response) => {
    await userController.deleteUserById(req, res);
})

export default router;