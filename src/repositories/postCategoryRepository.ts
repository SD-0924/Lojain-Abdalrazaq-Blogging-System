import PostCategory from '../models/PostCategory';

class PostCategoryRepository{

    //create post category
    async create(postCategoryData: any){
        return await PostCategory.create(postCategoryData);
    }

}

export default new PostCategoryRepository();