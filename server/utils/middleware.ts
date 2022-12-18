import { Request, Response } from "express";
import logger from "./logger";
import userService from "../services/userService";
import jwt from "jsonwebtoken";
import config from "../utils/config";
import asyncHandler from "express-async-handler";


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

const errorHandler = (
  error: Error,
  _request: Request,
  response: Response,
  next: (error?: unknown) => void
) => {
  logger.error(error.message);

  if (error.name === "CastError") {
    return response.status(400).send({ error: "malformatted id" });
  } else if (error.name === "ValidationError") {
    return response.status(400).json({ error: error.message });
  } else if (error.name === "JsonWebTokenError") {
    return response.status(401).json({
      error: "invalid token",
    });
} else if (error.name === "UserError") {
    return response.status(401).json({
      error: error.message,
    });
  } else {
    return next(error);
  }
};

const tokenExtractor = (request: any, _response: any, next: any) => {
  const authorization = request.get("authorization");
  if (authorization && authorization.toLowerCase().startsWith("bearer ")) {
    request["token"] = authorization.substring(7);
  }
  next();
};


const userExtractor = asyncHandler(async (request: any, _response: any, next: any) => {
  const token = request.query.token as string;
  const jwt_secret = config.SECRET as string;
  const decodedToken = jwt.verify(token, jwt_secret) as any;
  if (!token || !decodedToken.id) {
    throw new Error("token missing or invalid");
  } else {
    const user = await userService.getUser(decodedToken.id);
    request["user"] = user;
  }
  next();
});




export default {
  requestLogger,
  unknownEndpoint,
  errorHandler,
  tokenExtractor,
  userExtractor,
};
