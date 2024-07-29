import { NextFunction, Request, Response } from "express";
import { checkSchema, validationResult } from "express-validator";
import { ErrorHandler } from "../handlers/error.handler";

/**
 * Middleware to validate the creation of a user.
 *
 * This middleware checks the schema of the user request body, ensuring that
 * the email is present and in a valid format. If validation fails, it passes
 * an error to the next middleware with a status code of 400.
 *
 * @param {Request} req - The Express request object.
 * @param {Response} _res - The Express response object (unused).
 * @param {NextFunction} next - The next middleware function in the stack.
 */
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
