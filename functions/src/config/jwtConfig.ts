// config/jwtConfig.ts

import * as jwt from "jsonwebtoken";
import { User } from "../models/user.interface";

const JWT_SECRET = "your_secret_key"; // Use a strong secret key in production

export const generateToken = (userId: string): string => {
  return jwt.sign({ userId }, JWT_SECRET, { expiresIn: "1h" });
};

export const verifyToken = (token: string) => {
  try {
    return jwt.verify(token, JWT_SECRET) as Omit<User, "email">;
  } catch (error) {
    throw new Error("Invalid token");
  }
};
