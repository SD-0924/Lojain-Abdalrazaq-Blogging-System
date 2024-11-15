import PostCategory from "../models/PostCategory";
import PostRepository from '../repositories/postRepository';
import CategoryRepository from '../repositories/categoryRepository';

class PostCategoryService{

    // fucntion to create category for specific post
    async createCategoryForPost(postID: number, name: string){

        // check for the post existence by id
        const post = await PostRepository.findById(postID);
        if(!post){
            return "Post not found";
        }
        // check for the category existence by Name
        let category = await CategoryRepository.findByName(name);
        // if not found create new category
        if(!category){
            category = await CategoryRepository.create({name});
        }

        // creating the post category
        await PostCategory.create({
            postID: post.postID,
            categoryID: category.categoryID,
        });
    }

}

export default new PostCategoryService();