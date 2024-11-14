import { Router, Request, Response } from 'express'
import * as postController from '../controllers/postController'

const router = Router();

router.post('/', async (req: Request, res: Response) => {
    await postController.createPost(req, res)
})

export default router;