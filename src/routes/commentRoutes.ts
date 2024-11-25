import { Router, Request, Response } from 'express'
import * as commentController from '../controllers/commentController'

const router = Router();

router.post('/:postID/comments', async (req: Request, res: Response) => {
    await commentController.createComment(req, res)
})

router.get('/:postID/comments', async (req: Request, res: Response) => {
    await commentController.getCommentsByPostId(req, res)
})

export default router;