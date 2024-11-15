import Comment from '../models/Comment';

class CommentRepository {

    async create(commentData: any) {
        return await Comment.create(commentData);
    }

    async findAll() {
        return await Comment.findAll();
    }

    async findById(id: number) {
        return await Comment.findByPk(id);
    }

    async update(commentId: number, updateData: any) {
        const comment = await Comment.findByPk(commentId);
        if (comment) {
            return await comment.update(updateData);
        }
        return null;
    }

    async delete(id: number) {
        const comment = await Comment.findByPk(id);
        if (comment) {
            return await comment.destroy();
        }
        return null;
    }

    // i want to add a new method to get all comments of a specific post
    async getCommentsByPostId(postID: number) {
        return  await Comment.findAll({ where: { postID } });   
    }
    
}

export default new CommentRepository();