import { NextFunction, Request, Response } from "express";
import * as userService from "../services/user.service";
import { ErrorHandler } from "../handlers/error.handler";
import { ResponseHandler } from "../handlers/response.handler";
import { User } from "../models/user.interface";

/**
 * Gets a user by email and returns a User object.
 *
 * @param {Request} req - The request object containing the user email.
 * @param {Response} _res - The response object.
 * @param {NextFunction} next - The next middleware function.
 *
 * @returns {Promise<void>} - A promise that resolves when the user is found.
 */
export const getUserByEmail = async (
  req: Request,
  _res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const email = req.params.email;
    const user = await userService.getUserByEmail(email);
    if (!user) {
      next(new ErrorHandler(404, "User not found"));
    } else {
      const response = { user };
      next(new ResponseHandler(200, response, "User found"));
    }
  } catch (error) {
    next(new ErrorHandler(500, "Internal server Error"));
  }
};

/**
 * Adds a new user and returns an user ID.
 *
 * @param {Request} req - The request object containing the user data.
 * @param {Response} _res - The response object.
 * @param {NextFunction} next - The next middleware function.
 *
 * @returns {Promise<void>} - A promise that resolves when the user is added.
 */
export const addUser = async (
  req: Request,
  _res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const user: User = req.body;
    const newUser = await userService.addUser(user);
    const response = {
      newUser
    };
    next(new ResponseHandler(201, response, "User created"));
  } catch (error) {
    next(new ErrorHandler(500, "Internal server Error"));
  }
};
