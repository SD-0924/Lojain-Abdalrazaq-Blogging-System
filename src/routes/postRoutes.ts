import { Router, Request, Response } from 'express'
import * as postController from '../controllers/postController'
import authMiddleware from '../middlewares/authMiddleware';


const router = Router();

router.post('/create',authMiddleware, async (req: Request, res: Response) => {
    await postController.createPost(req, res)
})

router.get('/allposts', async (req: Request, res: Response) => {
    await postController.getPosts(req, res)
})

router.get('/getpost/:id', async (req: Request, res: Response) => {
    await postController.getPostById(req, res)
})

router.delete('/delete',authMiddleware, async (req: Request, res: Response) => {
    await postController.deletePost(req, res)
})

router.put('/update/:id', authMiddleware, async (req: Request, res: Response) => {
    await postController.updatePost(req, res)
})

export default router;