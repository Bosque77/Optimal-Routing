import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import express from "express";
import config from "../utils/config";
import userService from "../services/user-service";
import * as z from "zod";
import asyncHandler from "express-async-handler";
import { ERROR_CODES } from "../utils/errors";
const { OAuth2Client } = require("google-auth-library");

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

const userSchema = z.object({
  username: z.string(),
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
    const username = user_data.username;
    const password = user_data.password;

    const user = await userService.getUserByUsername(username);

    const passwordCorrect =
      user === null ? false : await bcrypt.compare(password, user.passwordHash);

    if (!(user && passwordCorrect)) {
      throw {
        name: ERROR_CODES.LOGIN_ERROR,
      };
    }

    const userForToken = {
      username: user.username,
      id: user._id,
    };


    const token = jwt.sign(userForToken, config.SECRET!);
    response.status(200).send({ token, username: user.username });

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

    // After successful verification and handling user login, send a response back to the client
    // response.send(...)

    const user = await userService.getUserByUsername(user_id);

    if (!user) {

      const new_user = await userService.createUserByGoogleId(
        user_id,
        user_email
      );
      
      const userForToken = {
        username: new_user.username,
        id: new_user._id,
      };

      const token = jwt.sign(userForToken, config.SECRET!);
      response.status(200).send({ token, username: new_user.username });
      
    } else {
      const userForToken = {
        username: user.username,
        id: user._id,
      };

      const token = jwt.sign(userForToken, config.SECRET!);
      response.status(200).send({ token, username: user.username });

    }
  })
);

export default loginRouter;
