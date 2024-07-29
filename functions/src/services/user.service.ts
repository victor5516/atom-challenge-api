import {User} from "../models/user.interface";

import {db} from "../config/firestore";
import {generateToken} from "../config/jwtConfig";
const UserCollection = db.collection("users");
export const getUserByEmail = async (email: string): Promise<User | null> => {
  const snapshot = await UserCollection.
    where("email", "==", email).
    get();
  if (snapshot.empty) {
    return null;
  } else {
    return snapshot.docs[0].data() as User;
  }
};

export const addUser = async (user: Partial<User>): Promise<{ id: string }> => {
  const result = await UserCollection.add(user);
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