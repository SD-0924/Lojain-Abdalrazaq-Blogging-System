import { Router, Request, Response } from 'express'
import * as postController from '../controllers/postController'

const router = Router();

router.post('/', async (req: Request, res: Response) => {
    await postController.createPost(req, res)
})

router.get('/', async (req: Request, res: Response) => {
    await postController.getPosts(req, res)
})

router.get('/:id', async (req: Request, res: Response) => {
    await postController.getPostById(req, res)
})

router.put('/:id', async (req: Request, res: Response) => {
    await postController.updatePost(req, res)
})

export default router;