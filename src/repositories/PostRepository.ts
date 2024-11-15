import Post from '../models/Post';

class PostRepository{

    // creating new post
    async create(postData: any){
        return await Post.create(postData);
    }

    // reading all posts
    async findAll(){
        return await Post.findAll();
    }

    // reading post by id
    async findById(id: number){
        return await Post.findByPk(id);
    }

    // updating post
    async update(postId: number, updateData: any){
        const post = await Post.findByPk(postId);
        if(post){
            return await post.update(updateData);
        }
        return null;
    }

    // deleting post
    async delete(id: number){
        const post = await Post.findByPk(id);
        if(post){
            return await post.destroy();
        }
        return null;
    }
}

export default new PostRepository();