import Post from '../models/PostCategory';

class PostCategoryRepository{

    //create post category
    async create(postCategoryData: any){
        return await Post.create(postCategoryData);
    }

}

export default new PostCategoryRepository();