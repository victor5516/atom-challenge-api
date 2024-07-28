import {User} from "../models/user.interface";

import {db} from "../config/firestore";
import {generateToken} from "../config/jwtConfig";

export const getUserByEmail = async (email: string): Promise<User | null> => {
  const snapshot = await db.collection("users").
    where("email", "==", email).
    get();
  if (snapshot.empty) {
    return null;
  } else {
    return snapshot.docs[0].data() as User;
  }
};

export const addUser = async (user: User): Promise<{ id: string }> => {
  const result = await db.collection("users").add(user);
  return {id: result.id};
};


export const loginService = async (email: string) => {
  const user = await getUserByEmail(email)

  if(!user) {
    return null
  }

  const token = generateToken(user.id || "")

  return token;
}