// middleware/authMiddleware.ts

import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../config/jwtConfig";
import { ErrorHandler } from "../handlers/error.handler";
import { log } from "firebase-functions/logger";

export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  log("authHeader", req.headers.authorization);
  if (!authHeader) {
    return  next(new ErrorHandler(401, "Acceso denegado"));
  }

  const token = authHeader.split(" ")[1];
  log("token", token)

  try {
    const decoded = verifyToken(token);
    req.body.user = { id: decoded.id };
    next();
  } catch (error) {
    next(new ErrorHandler(401, "Acceso denegado"));
  }
};
