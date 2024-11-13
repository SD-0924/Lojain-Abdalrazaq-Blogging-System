import { Sequelize, DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/database'; 
import User from './User';
import Post from './Post';

// interface for Comment attributes
interface CommentAttributes {
    commentID: number;
    content: string;
    userID: number;
    postID: number;
}

// interface for Comment creation attributes where the commentID is optional
interface CommentCreationAttributes extends Optional<CommentAttributes, 'commentID'> {}

// the comment model that extends Model class and uses the CommentAttributes and CommentCreationAttributes interfaces
class Comment extends Model<CommentAttributes, CommentCreationAttributes> implements CommentAttributes {
    public commentID!: number;
    public content!: string;
    public userID!: number;
    public postID!: number;
}

// defining the Comment model
Comment.init(
    {
        commentID: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        },
        content: {
        type: DataTypes.TEXT,
        allowNull: false,
        },
        userID: {
        type: DataTypes.INTEGER,
        allowNull: false,
            references: {
                model: User,
                key: 'userID',
            },
        },
        postID: {
        type: DataTypes.INTEGER,
        allowNull: false,
            references: {
                model: Post,
                key: 'postID',
            },
        },
    },
    {
        sequelize,
        modelName: 'Comment',
        tableName: 'comments',
        timestamps: true,
    }
);

export default Comment;