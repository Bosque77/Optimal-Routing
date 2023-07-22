import User from "../models/user-model";
import config from "../utils/config";
import bcrypt from "bcrypt";
import { createCustomer } from "../services/stripe-service";
import Region from "../models/region-model";
import { NewUser } from "../types";

// returns all users
const getAllUsers = async () => {
  const user_query = await User.find({});
  const users = user_query.map((user) => user.toJSON());
  return users;
};

// get a user by the email
const getUserByEmail = async (this_email: string) => {
  const user = await User.findOne({ email: this_email }).exec();
  return user;
};

// returns a user by id
const getUserById = async (user_id: string) => {
    const user = await User.findById(user_id).select('-stripeCustomerId');
    return user;
  };
  
const getStripeUserId = async (user_id: string) => {
  const user = await User.findById(user_id);
  if (!user) {
    throw new Error("User not found");
  }
  return user.stripeUserId;
};

const createUser = async (new_user: NewUser, verificationCode: string) => {
  try {
    const salt_rounds = Number(config.SALT_ROUNDS);
    const passwordHash = await bcrypt.hash(new_user.password, salt_rounds);

    const email = new_user.email;
    const name = new_user.first_name + " " + new_user.last_name;
    const stripeCustomerId = await createCustomer({ email, name });

    const user = new User({
      email: new_user.email,
      passwordHash,
      phone_number: new_user.phone_number,
      first_name: new_user.first_name,
      last_name: new_user.last_name,
      verified: false,
      verificationCode,
      stripeCustomerId,
    });

    console.log("about to save the user for mongo db");

    const savedUser = await user.save();

    // create a default region for this user
    const region = new Region({
      name: "Default Region",
      user_id: savedUser._id,
      latitude: 33.7488,
      longitude: -84.3881,
    });

    await region.save();

    return savedUser.toJSON();
  } catch (error) {
    if ((error as any).code === 11000) {
      // This is a duplicate key error (i.e., email already exists)
      throw new Error("Email already exists");
    } else {
      throw error;
    }
  }
};

const createUserByGoogleId = async (new_user: NewUser) => {
  try {
    const email = new_user.email;
    const name = new_user.first_name + " " + new_user.last_name;
    const stripeUserId = await createCustomer({ email, name });


    const user = new User({
      email,
      first_name: new_user.first_name,
      last_name: new_user.last_name,
      verified: true,
      stripeUserId,
    });

    const savedUser = await user.save();

    // create a default region for this user
    const region = new Region({
      name: "Default Region",
      user_id: savedUser._id,
      latitude: 33.7488,
      longitude: -84.3881,
    });

    const default_region = await region.save();
    console.log(default_region);

    console.log("about to return the saved user");

    return { user: savedUser.toJSON(), region: default_region.toJSON() };
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const updateUser = async (user_id: string, user_data: Partial<NewUser>) => {
  const user = await User.findById(user_id);

  if (!user) {
    throw new Error("User not found");
  }

  // Update the user data
  user.first_name = user_data.first_name || user.first_name;
  user.last_name = user_data.last_name || user.last_name;
  user.email = user_data.email || user.email;
  user.phone_number = user_data.phone_number || user.phone_number;

  const updatedUser = await user.save();
  return updatedUser.toJSON();
};

const verifyUser = async (user_id: string) => {
  const user = await User.findById(user_id);

  if (!user) {
    throw new Error("User not found");
  }

  user.verified = true;
  const savedUser = await user.save();
  return savedUser.toJSON();
};

export default {
  getUserById,
  getAllUsers,
  createUser,
  getUserByEmail,
  createUserByGoogleId,
  verifyUser,
  updateUser,
  getStripeUserId,
};
