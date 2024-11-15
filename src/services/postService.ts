import PostRepository from '../repositories/postRepository';
import UserService from './userService';
import commentService from './commentService';
import PostCategoryService from './postCategoryService';

class PostService{

    // create new post
    async createPost(postData: any){

        // first, i checked the user exists or not by calling getUserById method from UserService
        const userExists = await UserService.getUserById(postData.userID);
        if(!userExists){
            return null;
        }
        return await PostRepository.create(postData);
    }

    // read all posts
    async getAllPosts(){

        // Get all posts with associated users, categories, and comments
        // firstly, i want to get all the posts using the findAll method from PostRepository
        const posts = await PostRepository.findAll();

        if (posts.length === 0) {
            return "There are no posts available in the Database";
        }
        // then, i want to get all the users using the getAllUsers method from UserService
        const enhancedPosts = await Promise.all(
            posts.map(async (post: any) => {
                // the user 
                const user = await UserService.getUserById(post.userID);
                // the categories
                const categories = await PostCategoryService.getCategoriesPost(post.postID);
                // the comments
                const comments = await commentService.getCommentsByPostId(post.postID);

                // json response
                return{
                     ...post.toJSON(), // Convert Sequelize instance to plain object
                    user,
                    categories,
                    comments,
                };
            })
            
        );

        return enhancedPosts;
    }

    // read post by id
    async getPostById(postId: number){
        return await PostRepository.findById(postId);
    }

    // update post
    async updatePost(postId: number, updateData: any){
        // i want to check if the user that i want to update the post with his id exists or not
        if(updateData.userID){
            const userExists = await UserService.getUserById(updateData.userID);
            if(!userExists){
                return null;
            }
        }
        // if the user exists, i will update the post with the new data if the post id exists
        return await PostRepository.update(postId, updateData);
    }

    // delete post
    async deletePost(postId: number){
        return await PostRepository.delete(postId);
    }

}

export default new PostService();