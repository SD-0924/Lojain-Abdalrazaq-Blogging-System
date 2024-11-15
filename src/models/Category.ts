import { Sequelize, DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/database'; 

// interface for Category attributes
interface CategoryAttributes {
    categoryID: number;
    name: string;
}

// interface for Category creation attributes where the categoryID is optional
interface CategoryCreationAttributes extends Optional<CategoryAttributes, 'categoryID'> {}

// the category model that extends Model class and uses the CategoryAttributes and CategoryCreationAttributes interfaces
class Category extends Model<CategoryAttributes, CategoryCreationAttributes> implements CategoryAttributes {
    public categoryID!: number;
    public name!: string;
}

// defining the Category model
Category.init(
    {
        categoryID: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        sequelize,
        tableName: 'categories',
        modelName: 'Category',
        timestamps: false,
    }
);

export default Category;