import {NextFunction, Request, Response} from "express";

/**
 * Class representing a custom error handler.
 * @extends Error
 */
export class ErrorHandler extends Error {
  /**
     * The HTTP status code of the error.
     */
  statusCode: number;

  /**
     * Creates an instance of ErrorHandler.
     * @param {number} statusCode - The HTTP status code of the error.
     * @param {string} message - The error message.
     */
  constructor(statusCode: number, message: string) {
    super(message);
    this.statusCode = statusCode;
  }
}

export const handleError = (
  err: ErrorHandler,
  _req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _next: NextFunction
) => {
  const {statusCode = 500 } = err;
  let {message} = err;

  if (!(err instanceof ErrorHandler)) {
    message = "Ocurrió un error en el servidor ⛔";
  }
  console.log(err);
  res.status(statusCode).json({
    status: "ERROR",
    statusCode,
    message,
  });
};


