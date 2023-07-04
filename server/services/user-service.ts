import User from "../models/user-model";
import config from "../utils/config";
import bcrypt from 'bcrypt'
import { createCustomer } from '../services/stripe-service'
import Region from "../models/region-model";




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
const createUser = async (username: string, password: string, stripeCustomerId: string) => {
    const salt_rounds = Number(config.SALT_ROUNDS)
    const passwordHash = await bcrypt.hash(password, salt_rounds)
    const user = new User({
        username,
        passwordHash,
        stripeCustomerId
    })

    const savedUser = await user.save()
    return savedUser.toJSON()
}




const createUserByGoogleId = async (user_id: string, user_email: string) => {

    const username = user_id
    const email = user_email
    const stripeCustomerId = await createCustomer({email, name: username})

    const user = new User({
        username,
        email,
        stripeCustomerId
    })

    const savedUser = await user.save()
    console.log(savedUser)

    // create a default region for this user
    const region = new Region({
        name: "Default Region",
        user_id: savedUser._id,
        latitude: 33.7488,
        longitude: -84.3881
    })

    const default_region = await region.save()
    console.log(default_region)


    console.log('about to return the saved user')

    return savedUser.toJSON()

}


export default { getUserById, getAllUsers, createUser, getUserByUsername, createUserByGoogleId}