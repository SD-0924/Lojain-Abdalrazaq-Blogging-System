import PostCategory from '../models/PostCategory';

class PostCategoryRepository{

    //create post category
    async create(postCategoryData: any){
        return await PostCategory.create(postCategoryData);
    }

    // get all categories of a post
    async findByPostId(postID: number){
        return await PostCategory.findAll({
            where: {
                postID: postID
            }
        });
    }

}

export default new PostCategoryRepository();