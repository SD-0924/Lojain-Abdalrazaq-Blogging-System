import categoryRepository from "../repositories/categoryRepository";

class CategoryService{

    // create new category
    async createCategory(categoryData: any){
        return await categoryRepository.create(categoryData);
    }

    // get category by name
    async getCategoryByName(name: string){
        return await categoryRepository.findByName(name);
    }
}

export default new CategoryService();