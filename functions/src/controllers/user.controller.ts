import {NextFunction, Request, Response} from "express";
import * as userService from "../services/user.service";
import {ErrorHandler} from "../handlers/error.handler";
import {ResponseHandler} from "../handlers/response.handler";
import {User} from "../models/user.interface";

export const getUserByEmail = async (
  req: Request,
  _res: Response,
  next: NextFunction) => {
  try {
    const email = req.params.email;
    const token = await userService.loginService(email);
    if (!token) {
      next(new ErrorHandler(404, "User not found"));
    }
    const response = {
      token
    }
    next( new ResponseHandler(200, response, "User found"));
  } catch (error) {
    next(new ErrorHandler(500, "Internal server Error"));
  }
};

export const addUser = async (
  req: Request,
  _res: Response,
  next: NextFunction) => {
  try {
    const user: User = req.body;
    const newUser = await userService.addUser(user);
    const token = await userService.loginService(user.email);
    const response = {
      newUser,
      token
    }
    next(new ResponseHandler(200, response, "User created"));
  } catch (error) {
    next(new ErrorHandler(500, "Internal server Error"));
  }
};
