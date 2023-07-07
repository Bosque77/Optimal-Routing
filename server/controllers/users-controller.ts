import express from "express";
import { Request, Response } from "express";
import userService from "../services/user-service";
import asyncHandler from "express-async-handler";
import config from "../utils/config";


import * as z from "zod";
import {
  sendVerificationEmail,
  generateVerificationCode,
} from "../utils/email";

const usersRouter = express.Router();

const newUserSchema = z.object({
  first_name: z.string(),
  last_name: z.string(),
  email: z.string(),
  password: z.string(),
  phone: z.string().optional(),
});

// returns all users
usersRouter.get(
  "/",
  asyncHandler(async (_request: Request, response: Response) => {
    const users = await userService.getAllUsers();
    response.json(users);
  })
);



// verify the user via the email address link
usersRouter.get(
  "/verify/:userId/:verificationCode",
  asyncHandler(async (request: Request, response: Response) => {
    console.log('inside verify user')
    const { userId, verificationCode } = request.params;

    const decodedVerificationCode = decodeURIComponent(verificationCode);

    // Find the user by id
    const user = await userService.getUserById(userId);

    if (!user) {
      response.status(404).json({ message: "User not found" });
    } else if (user.verificationCode === decodedVerificationCode ) {
      // Update the user's verified status
      await userService.verifyUser(userId);
      response.json({ message: "User has been successfully verified" });
    } else {
      response.status(400).json({ message: "Invalid verification code" });
    }
  })
);

// returns a user by id
usersRouter.get(
  "/:id",
  asyncHandler(async (request: Request, response: Response) => {
    const the_user = await userService.getUserById(request.params.id);
    if (the_user) {
      response.json(the_user);
    } else {
      throw {
        name: "UserNotFound",
      };
    }
  })
);




// creates a new user
usersRouter.post(
  "/signup",
  asyncHandler(async (request: Request, response: Response) => {
    try {
      const user_data = newUserSchema.parse(request.body);
      const verificationCode = await generateVerificationCode(user_data.email);
      const newUser = await userService.createUser(user_data, verificationCode);
      const uri_safe_verification_code = encodeURIComponent(verificationCode);
      const verificationLink = `${config.SERVER_URI}/api/users/verify/${newUser.id}/${uri_safe_verification_code}`;
      await sendVerificationEmail(user_data.email, verificationLink);
      response.json({ message: "User created. Please verify your email." });
    } catch (error) {
      console.error(error);
      response.status(500).json({ message: "An error occurred while processing your request." });
    }
  })
);



export default usersRouter;
