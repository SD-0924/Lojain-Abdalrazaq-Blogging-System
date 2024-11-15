import commentRepository from "repositories/commentRepository";
import userService from "services/userService";
import postService from "services/postService";

class CommentService{

    // create comment
    async createComment(commentData: any){
        // first, i checked the user exists or not by calling getUserById method from
        // calling the -> UserService
        const userExists = await userService.getUserById(commentData.userID);
        if(!userExists){
            return null;
        }
        // then, i checked the post exists or not by calling getPostById method from
        // calling the -> PostService
        const postExists = await postService.getPostById(commentData.postID);
        if(!postExists){
            return null;
        }
        return await commentRepository.create(commentData);
    }

    // get comment of specfic post
    async getCommentsByPostId(postId: number){
        return await commentRepository.getCommentsByPostId(postId);
    }
}
export default new CommentService();