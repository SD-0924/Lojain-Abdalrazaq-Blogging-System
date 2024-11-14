import { Router, Request, Response } from 'express'
import { createUser, getAllUsers } from '../controllers/userController'; // Import the controller

const router = Router();

router.post('/', async (req: Request, res: Response) => {
    await createUser(req, res)
})

router.get('/', async (req: Request, res: Response) => {
    await getAllUsers(req, res);
})
export default router;