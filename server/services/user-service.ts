import User from "../models/user-model";
import config from "../utils/config";
import bcrypt from 'bcrypt'




// returns all users
const getAllUsers = async () => {
    const user_query = await User.find({});
    const users = user_query.map(user => user.toJSON())
    return users;
}

// gets a user by the username
const getUserByUsername = async (this_username: string) => {
    const user = await User.findOne( {username: this_username} ).exec(); 
    return user

}  

// returns a user by id
const getUserById = async (user_id: string) => {
    const user = await User.findById(user_id);
    return user;
}

// creates a new user
const createUser = async (username: string, password: string) => {
    const salt_rounds = Number(config.SALT_ROUNDS)
    const passwordHash = await bcrypt.hash(password, salt_rounds)
    const user = new User({
        username,
        passwordHash,
    })

    const savedUser = await user.save()
    return savedUser.toJSON()

}


export default { getUserById, getAllUsers, createUser, getUserByUsername}