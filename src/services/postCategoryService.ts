import PostCategoryRepository from "../repositories/postCategoryRepository";
import postService from './postService';
import categoryService from "./categoryService";


class PostCategoryService{

    // fucntion to create category for specific post
    async createCategoryForPost(postID: number, categoryName: string){

        // check for the post existence by id
        const post = await postService.getPostById(postID);

        if(!post){
            return "Post not found to add category";
        }
        // check for the category existence by Name
        console.log("checking for category existence");

        let category = await categoryService.getCategoryByName(categoryName);

        // if not found create new category
        if(!category){
            console.log("Category not found, creating new category");
            category = await categoryService.createCategory({name: categoryName});
            console.log(`Category created successfully with id: ${category.categoryID}`);
        }
        // creating the post category
        return await PostCategoryRepository.create({
            postID: postID,
            categoryID: category.categoryID,
        });
    }

    // function to get all categories of a post
    async getCategoriesPost(postID: number){

        // query the post categories
        const postCategories = await PostCategoryRepository.findByPostId(postID);

        // check the returned data
        if (!postCategories || postCategories.length === 0) {
            return (`No categories found for post with ID ${postID}`);
        }

        // extracting the categories Id and fetching the categories
        const categoryIDs = postCategories.map(pc => pc.categoryID);
        // fetching the categories by ids from the Category service
        const categories = await categoryService.getCategoriesByIds(categoryIDs);

        return categories;
    }
}

export default new PostCategoryService();