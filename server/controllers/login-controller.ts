import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import express from "express";
import config from "../utils/config";
import userService from "../services/user-service";
import * as z from "zod";
import asyncHandler from "express-async-handler";
import { ERROR_CODES } from "../utils/errors";
import { NewUser } from "../types";
const { OAuth2Client } = require("google-auth-library");

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

const userSchema = z.object({
  email: z.string(),
  password: z.string(),
});

const googleCredentialsSchema = z.object({
  google_credentials: z.string(),
});

const loginRouter = express.Router();

// login for the user
loginRouter.post(
  "/",
  asyncHandler(async (request: Request, response: Response) => {
    const user_data = userSchema.parse(request.body);
    const email = user_data.email;
    const password = user_data.password;

    const user = await userService.getUserByEmail(email);

    if (!user) {
      response.status(401).json({ message: "User not found" });
    }

    if (!user!.verified) {
      response.status(401).json({ message: "User not verified" });
    }

    const passwordCorrect =
      user === null ? false : await bcrypt.compare(password, user.passwordHash);

    if (!(user && passwordCorrect)) {
      throw {
        name: ERROR_CODES.LOGIN_ERROR,
      };
    }

    const userForToken = {
      email: user.email,
      id: user._id,
    };


    const token = jwt.sign(userForToken, config.SECRET!);
    response.status(200).send({ token, email: user.email });

  })
);

loginRouter.post(
  "/google",
  asyncHandler(async (request: Request, response: Response) => {
    console.log("inside google login router");
    const google_credentials_object = googleCredentialsSchema.parse(
      request.body
    );
    const tokenId = google_credentials_object.google_credentials;

    const ticket = await client.verifyIdToken({
      idToken: tokenId,
      audience: process.env.GOOGLE_CLIENT_ID, // Specify the CLIENT_ID of the app that accesses the backend
    });
    const payload = ticket.getPayload(); // This contains the user information
    const user_id = payload["sub"]; // User's Google ID
    const user_email = payload["email"]; // User's email
    const user_given_name = payload["given_name"] || ""; // User's first name
    const user_family_name = payload["family_name"] || ""; // User's last name

    // After successful verification and handling user login, send a response back to the client
    // response.send(...)

    const user = await userService.getUserByEmail(user_email);
    

    if (!user) {

      const new_user: NewUser = {
        first_name: user_given_name,
        last_name: user_family_name,
        email: user_email,
        password: user_id // Assuming Google ID is used as password
      };

      const created_user_data = await userService.createUserByGoogleId(new_user);

      const created_user = created_user_data.user;
      
      const userForToken = {
        email: created_user.email,
        id: created_user._id,
      };

      const token = jwt.sign(userForToken, config.SECRET!);
      response.status(200).send({ token, email: created_user.email, first_name: created_user.first_name, last_name: created_user.last_name });
      
    } else {
      const userForToken = {
        email: user.email,
        id: user._id,
      };

      const token = jwt.sign(userForToken, config.SECRET!);
      response.status(200).send({ token, username: user.email });

    }
  })
);


export default loginRouter;
