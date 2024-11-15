import { Sequelize, DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/database'; 
import User from './User';  // import the User model
import Category from './Category';

// interface for Post attributes
interface PostAttributes {
    postID: number;
    title: string;
    content: string;
    userID: number;
    createdAt?: Date;
    updatedAt?: Date;
}

// interface for Post creation attributes where the postID is optional
interface PostCreationAttributes extends Optional<PostAttributes, 'postID'> {}

// the post model that extends Model class and uses the PostAttributes and PostCreationAttributes interfaces
class Post extends Model<PostAttributes, PostCreationAttributes> implements PostAttributes {
    public postID!: number;
    public title!: string;
    public content!: string;
    public userID!: number;
    public createdAt!: Date;
    public updatedAt!: Date;
}

// defining the Post model
Post.init(
    {
        postID: { // post ID
            type: DataTypes.INTEGER,
            autoIncrement: true,  
            primaryKey: true, 
        },
        title: { // post title
            type: DataTypes.STRING,
            allowNull: false,
        },
        content: { // post content
            type: DataTypes.TEXT,
            allowNull: false,
        }, 
        userID: { // user ID foreign key from the User model
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: User, 
                key: 'userID',  
            },
        },
    },
    {
        sequelize,  // Pass the sequelize instance here
        tableName: 'posts',  
        modelName: 'Post',  // The name of the model
        timestamps: true,   // Enable timestamps
    }
);

// export the Post model
export default Post;