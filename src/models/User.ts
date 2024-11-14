import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/database';

// interface for User attributes
interface UserAttributes {
    userID: number;
    userName: string;
    password: string;
    email: string;
    createdAt?: Date;
    updatedAt?: Date;
}

// interface for User creation attributes where the userID is optional
interface UserCreationAttributes extends Optional<UserAttributes, 'userID'> {}

// the user model that extends Model class and uses the UserAttributes and UserCreationAttributes interfaces
class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
    public userID!: number;
    public userName!: string;
    public password!: string;
    public email!: string;
    public createdAt!: Date;
    public updatedAt!: Date;
}

// defining the User model
User.init(
    {
        userID: { // user ID
            type: DataTypes.INTEGER,  
            autoIncrement: true,  
            primaryKey: true,  
        },
        userName: { // user name
            type: DataTypes.STRING,  
            allowNull: false,  
            unique: true,   // the user name should be unique
        },
        password: { // password
            type: DataTypes.STRING,  
            allowNull: false, 
        },
        email: { // email
            type: DataTypes.STRING, 
            allowNull: false, 
            unique: true,  // the email should be unique
        },
    },
    {
        sequelize,  // Pass the sequelize instance here
        tableName: 'users',     // Name of the table in the database
        modelName: 'User',      // Name of the model
        timestamps: true,       // Adds createdAt and updatedAt timestamps
    }
);

export default User;
