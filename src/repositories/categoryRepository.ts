import Category from "../models/Category";

class CategoryRepositroy{

    //create category
    async create(categoryData: any){
        return await Category.create(categoryData);
    }

    // check if category exists by name
    async findByName(name: string){
        return await Category.findOne({where: {name}});
    }

    // check if category exists by id
    async findById(id: number){
        return await Category.findByPk(id);
    }

    // get all categories
    async findByIds(categoryIDs: number[]) {
        return await Category.findAll({
            where: { categoryID: categoryIDs },
        });
    }
    
}

export default new CategoryRepositroy();