import {NextFunction, Request, Response} from "express";
import {checkSchema, validationResult} from "express-validator";
import {ErrorHandler} from "../handlers/error.handler";

export const createUserValidation = async (
  req: Request,
  _res: Response,
  next: NextFunction
) => {
  await checkSchema({
    email: {
      in: ["body"],
      isEmail: true,
      errorMessage: "Email is required",
    },
  }).run(req);
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const errorMessage = JSON.stringify(errors.array());
    next(new ErrorHandler(400, errorMessage));
  }

  next();
}