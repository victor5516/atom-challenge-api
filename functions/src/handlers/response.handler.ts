import {NextFunction, Request, Response} from "express";


/**
 * Class representing a custom response handler.
 */
export class ResponseHandler {
  /**
   * The HTTP status code of the response.
   */
  statusCode: number;

  /**
   * The result of the operation.
   */
  result: unknown;

  /**
   * An optional message for the response.
   */
  message?: string;

  /**
   * Creates an instance of ResponseHandler.
   * @param {number} statusCode - The HTTP status code of the response.
   * @param {unknown} result - The result of the operation.
   * @param {string} [message] - An optional message for the response.
   */
  constructor(statusCode: number, result: unknown, message?: string) {
    this.statusCode = statusCode;
    this.result = result;
    this.message = message;
  }
}


export const handleResponse = (
  info: ResponseHandler,
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  if (info instanceof Error) {
    next(info);
  }

  if (info instanceof ResponseHandler) {
    const {statusCode, message, result} = info;

    res.status(statusCode).json({
      status: "SUCCESS",
      statusCode,
      message,
      result,
    });
  } else {
    res.json(info);
  }
};
