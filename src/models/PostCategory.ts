import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database";
import Category from "./Category";
import Post from "./Post";

// interface for PostCategory attributes
interface PostCategoryAttributes {
    postID: number;
    categoryID: number;
}

class PostCategory extends Model<PostCategoryAttributes> implements PostCategoryAttributes {
    public postID!: number;
    public categoryID!: number;
}

PostCategory.init(
    {
        postID: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            references:{
                model: Post,
                key: 'postID',
            },
        },
        categoryID: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            references:{
                model: Category,
                key: 'categoryID',
            },
        },
    },
    {
        sequelize,
        tableName: 'post_categories',
        modelName: 'PostCategory',
        timestamps: true,
    }
)


export default PostCategory;