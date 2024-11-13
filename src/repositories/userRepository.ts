import User from '../models/User';

// repository layer will handle direct database interactions for User CRUD operations.
class UserRepository {

    async create(userData: any) {
        return await User.create(userData);
    }

    async findAll() {
        return await User.findAll();
    }

    async findById(id: number) {
        return await User.findByPk(id);
    }

    async update(userId: number, updateData: any) {
        const user = await User.findByPk(userId);
        if (user) {
            return await user.update(updateData);
        }
        return null;
    }

    async delete(id: number) {
        const user = await User.findByPk(id);
        if (user) {
            return await user.destroy();
        }
        return null;
    }
    
}

// here we are returning an instance of the class - Singleton pattern
export default new UserRepository();
