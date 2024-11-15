import { Router, Request, Response } from 'express'
import * as postCategoryController from '../controllers/postCategoryController'

const router = Router();

router.post('/:postID/categories', async (req: Request, res: Response) => {
    await postCategoryController.createCategoryPost(req, res)
})

router.get('/:postID/categories', async (req: Request, res: Response) => {
    await postCategoryController.getCategoriesPost(req, res)
})

export default router;