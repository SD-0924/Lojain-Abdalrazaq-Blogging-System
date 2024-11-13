import UserRepository from '../repositories/userRepository';

class UserService{

    async createUser(userData: any) {
        return await UserRepository.create(userData);
    }

    async getAllUsers() {
        return await UserRepository.findAll();
    }

    async getUserById(userId: number) {
        return await UserRepository.findById(userId);
    }

    async updateUser(userId: number, updateData: any) {
        return await UserRepository.update(userId, updateData);
    }

    async deleteUser(userId: number) {
        return await UserRepository.delete(userId);
    }
    
}

export default new UserService();