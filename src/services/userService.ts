import UserRepository from '../repositories/userRepository';
import jwt from 'jsonwebtoken';

class UserService{

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

    async findDuplicateUser(email: string, userName: string){

        const findUserEmail = await UserRepository.findByEmail(email);
        if(findUserEmail){
            return "Email already exists";
        }

        const findUserName = await UserRepository.findByUserName(userName);
        if (findUserName){
            return "Username already exists";
        }

        // no duplicated user found
        return null; 
    }

    // updated create User fucntion to generate the JWT token
    async createUserAndGenerateToken(userData: any){
        
        // creating user record using the UserRepository
        const user = await UserRepository.create(userData);

        // ** JWT Token using generateJWT function ** //
        const token =  UserService.generateJWT(user);

        // return the user and the token
        return { user, token };
    }

    static generateJWT(user: any) {

        // generating the token and returning it
        const payload = { userID: user.userID, userName: user.userName };
        const secretKey = String(process.env.JWT_SECRET);
        const token = jwt.sign(payload, secretKey, { expiresIn: '1h' });

        return token;
    }
    
}

export default new UserService();