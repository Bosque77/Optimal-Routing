import express from "express";
import { Request, Response } from "express"; 
import userService from "../services/user-service";
import config from "../utils/config";
import * as z from "zod";
import { sendVerificationEmail, generateVerificationCode } from "../utils/email";


const signUpRouter = express.Router();

const newUserSchema = z.object({
  first_name: z.string(),
  last_name: z.string(),
  email: z.string(),
  password: z.string(),
  phone_number: z.string().optional(),
});


signUpRouter.get("/verify/:userId/:verificationCode", async (request: Request, response: Response) => {
    try {
      const { userId, verificationCode } = request.params;
      const decodedVerificationCode = decodeURIComponent(verificationCode);
      const user = await userService.getUserById(userId);
  
      if (!user) {
        response.status(404).json({ message: "User not found" });
      } else if (user.verificationCode === decodedVerificationCode) {
        await userService.verifyUser(userId);
        response.json({ message: "User has been successfully verified" });
      } else {
        response.status(400).json({ message: "Invalid verification code" });
      }
    } catch (error) {
      console.error(error);
      response.status(500).json({ message: "An error occurred while processing your request." });
    }
  });


  signUpRouter.post("/signup", async (request: Request, response: Response) => {
    try {
      const user_data = newUserSchema.parse(request.body);

      // check if user already exists
      const user = await userService.getUserByEmail(user_data.email);
      if (user) {
        response.status(409).json({ message: "A user account is already tied to this email address" });
        return;
      }
      const verificationCode = await generateVerificationCode(user_data.email);
      const newUser = await userService.createUser(user_data, verificationCode);
      const uri_safe_verification_code = encodeURIComponent(verificationCode);
      const verificationLink = `${config.SERVER_URI}/api/sign-up/verify/${newUser.id}/${uri_safe_verification_code}`;
      await sendVerificationEmail(user_data.email, verificationLink);
      response.json({ message: "User created. Please verify your email." });
    } catch (error) {
      console.error(error);
      response.status(500).json({ message: "An error occurred while processing your request." });
    }
  });
  
  

  export default signUpRouter;