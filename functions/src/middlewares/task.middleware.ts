import { NextFunction, Request, Response } from "express";
import { checkSchema, validationResult } from "express-validator";
import { ErrorHandler } from "../handlers/error.handler";

/**
 * Middleware to validate the creation of a task.
 *
 * This middleware checks the schema of the task request body, ensuring that
 * the title and description meet the specified criteria. If validation fails,
 * it passes an error to the next middleware with a status code of 400.
 *
 * @param {Request} req - The Express request object.
 * @param {Response} _res - The Express response object (unused).
 * @param {NextFunction} next - The next middleware function in the stack.
 */
export const createTaskValidation = async (
  req: Request,
  _res: Response,
  next: NextFunction
) => {
  await checkSchema({
    title: {
      in: ["body"],
      isString: true,
      errorMessage: "Title is required",

    },
    description: {
      in: ["body"],
      isString: true,
      errorMessage: "Description is required",

    },
  }).run(req);

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const errorMessage = JSON.stringify(errors.array());
    next(new ErrorHandler(400, errorMessage));
  }

  next();
};
