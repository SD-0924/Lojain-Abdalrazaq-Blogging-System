import { Router, Request, Response } from 'express'
import { createUser } from '../controllers/userController'; // Import the controller

const router = Router();

router.post('/', async (req: Request, res: Response) => {
    await createUser(req, res)
})

export default router;