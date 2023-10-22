import { Request, Response } from "express";
import logger from "./logger";
import userService from "../services/user-service";
import jwt from "jsonwebtoken";
import config from "../utils/config";
import asyncHandler from "express-async-handler";
import { ERROR_CODES } from "../utils/errors";
import { UserType } from "../types";

const requestLogger = (
  req: Request,
  _res: Response,
  next: (error?: unknown) => void
) => {
  logger.info("Method:", req.method);
  logger.info("Path:  ", req.path);
  logger.info("Body:  ", req.body);
  logger.info("---");
  next();
};

const unknownEndpoint = (_req: Request, res: Response) => {
  res.status(404).send({ error: "unknown endpoint" });
};

// handles errors for application
const errorHandler = (
  error: Error,
  _request: Request,
  response: Response,
  next: (error?: unknown) => void
) => {
  logger.error(error.message);

  switch (error.name) {
    case "CastError":
      return response.status(400).send({ error: "malformatted id" });
    case "ValidationError":
      return response.status(400).json({ error: "validation error" });
    case "JsonWebTokenError":
      return response.status(401).json({ error: "invalid token" });
    case ERROR_CODES.NOT_AUTHENTICATED:
      return response
        .status(401)
        .json({ error: "user must be logged in to perform this operation" });
    case ERROR_CODES.USER_CREATION_ERROR:
      return response.status(400).json({ error: error.message });
    case ERROR_CODES.LOGIN_ERROR:
      return response
        .status(401)
        .json({ error: "invalid username or password" });
    case ERROR_CODES.USER_NOT_FOUND:
      return response.status(404).json({ error: "user not found" });
    case ERROR_CODES.TOKEN_NOT_FOUND:
      return response.status(401).json({ error: "token not found" });
    case ERROR_CODES.ZOD_ERROR:
      return response.status(400).json({error: "Zod error proccing request. Input type does not match Expected Type."})
    default:
      return next(error);
  }
};

// extracts the token from the request
const tokenExtractor = (
  request: any,
  _response: any,
  next: (error?: unknown) => void
) => {
  const authorization = request.get("authorization");
  if (authorization && authorization.toLowerCase().startsWith("bearer ")) {
    request["token"] = authorization.substring(7);
  }
  next();
};

// gets the user from the token
const userExtractor = asyncHandler(
  async (
    request: Request,
    _response: Response,
    next: (error?: unknown) => void
  ) => {
    const token = request.token as string;
    const jwt_secret = config.SECRET as string;
    const decodedToken = jwt.verify(token, jwt_secret) as any;
    console.log('decoding the token on the server side')
    console.log(decodedToken)
    if (!token || !decodedToken.id) {
      console.log('error with the token')
      throw {
        name: ERROR_CODES.TOKEN_NOT_FOUND,
      };
    } else {
      console.log('getting the user from the token')
      const user = await userService.getUserByEmail(decodedToken.email);
      console.log(user)
      if (!user) {
        throw {
          name: ERROR_CODES.USER_NOT_FOUND,
        };
      } else {
        const formatted_user: UserType = { _id: user.id, stripeUserId: user.stripeUserId };
        request.user = formatted_user;
      }
      next();
    }
  }
);

export default {
  requestLogger,
  unknownEndpoint,
  errorHandler,
  tokenExtractor,
  userExtractor,
};
