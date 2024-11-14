import PostRepository from '../repositories/postRepository';
import UserService from './userService';

class PostService{

    // create new post
    async createPost(postData: any){

        // first, i checked the user exists or not by calling getUserById method from UserService
        const userExists = await UserService.getUserById(postData.userId);
        if(!userExists){
            return null;
        }
        return await PostRepository.create(postData);
    }

    // read all posts
    async getAllPosts(){
        return await PostRepository.findAll();
    }

    // read post by id
    async getPostById(postId: number){
        return await PostRepository.findById(postId);
    }

    // update post
    async updatePost(postId: number, updateData: any){
        return await PostRepository.update(postId, updateData);
    }

    // delete post
    async deletePost(postId: number){
        return await PostRepository.delete(postId);
    }

}

export default new PostService();