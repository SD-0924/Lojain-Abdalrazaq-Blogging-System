import User from '../models/User';

// repository layer will handle direct database interactions for User CRUD operations.
class UserRepository {

    async create(userData: any) {
        return await User.create(userData);
    }

    async findAll() {
        return await User.findAll({
            // here, i am specifying the attributes that i want to return
        attributes: ['userID', 'userName', 'email'] 
    });
    }

    async findById(id: number) {
        return await User.findByPk(id,{
            // here, i am specifying the attributes that i want to return
            attributes: ['userID', 'userName', 'email']
        });
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

    // Now, in addition to the CRUD operations,
    // we will add methods to find a user by email or username in order to authenticate a user
    async findByEmail(email: string) {
        return await User.findOne({ where: { email } });
    }
    
    async findByUserName(userName: string){
        return await User.findOne({ where: { userName } });
    }
}

// here we are returning an instance of the class - Singleton pattern
export default new UserRepository();
