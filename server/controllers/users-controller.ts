import express from "express";
import { Request, Response } from "express"; 
import userService from "../services/user-service";
import stripeService from "../services/stripe-service"
import * as z from "zod";
import { UserType } from "../types";

const usersRouter = express.Router();

const newUserSchema = z.object({
  first_name: z.string(),
  last_name: z.string(),
  email: z.string(),
  password: z.string(),
  phone_number: z.string().optional(),
});

const updateUserSchema = newUserSchema.omit({ password: true });


// get users info
usersRouter.get("/", async (request: Request, response: Response) => {
  try {
    const user = request.user as UserType;
    const user_id = user._id as string;
    const user_data = await userService.getUserById(user_id);
    response.json(user_data);
  } catch (error) {
    console.error(error);
    response.status(500).json({ message: "An error occurred while fetching the user data." });
  }
});

// get users cards
usersRouter.get("/cards", async (request: Request, response: Response) => {
  try {
    const user = request.user as UserType;
    const user_id = user._id as string;
    const stripe_user_id = await userService.getStripeUserId(user_id);
    console.log(stripe_user_id)
    const card_data = await stripeService.getCustomerCards(stripe_user_id!);
    response.json(card_data);
  } catch (error) {
    console.error(error);
    response.status(500).json({ message: "An error occurred while fetching the users card data." });
  }
});


// update user
usersRouter.put("/", async (request: Request, response: Response) => {
  try {
    const user = request.user as UserType;
    const user_id = user._id as string;
    const user_data = updateUserSchema.parse(request.body);
    const updatedUser = await userService.updateUser(user_id, user_data);
    response.json(updatedUser);
  } catch (error) {
    console.error(error);
    response.status(500).json({ message: "An error occurred while updating the user data." });
  }
});




export default usersRouter;

