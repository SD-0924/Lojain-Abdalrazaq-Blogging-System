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

    // adding the methods to find a user by email or username
    async getUserByEmail(email: string){
        return await UserRepository.findByEmail(email);
    }
    
    async getUserByUserName(userName: string){
        return await UserRepository.findByUserName(userName);
    }
}

export default new UserService();