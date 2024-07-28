import {NextFunction, Request, Response} from "express";
import {checkSchema, validationResult} from "express-validator";
import {ErrorHandler} from "../handlers/error.handler";


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
      isLength: {
        errorMessage: "Title should be at least 3 chars long",
        options: {min: 3},
      },
    },
    description: {
      in: ["body"],
      isString: true,
      errorMessage: "Description is required",
      isLength: {
        errorMessage: "Description should be at least 10 chars long",
        options: {min: 10},
      },
    },
  }).run(req);
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const errorMessage = JSON.stringify(errors.array());
    next(new ErrorHandler(400, errorMessage));
  }

  next();
};
