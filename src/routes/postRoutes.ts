import { Router, Request, Response } from 'express'
import * as postController from '../controllers/postController'

const router = Router();

router.post('/', async (req: Request, res: Response) => {
    await postController.createPost(req, res)
})

router.get('/', async (req: Request, res: Response) => {
    await postController.getPosts(req, res)
})

export default router;