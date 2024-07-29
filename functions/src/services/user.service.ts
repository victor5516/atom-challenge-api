import { User } from "../models/user.interface";
import { db } from "../config/firestore";


const UserCollection = db.collection("users");

/**
 * Retrieves a user by email from the Firestore collection.
 *
 * @param {string} email - The email of the user to retrieve.
 *
 * @returns {Promise<User | null>} - A promise that resolves to the user if found, otherwise null.
 */
export const getUserByEmail = async (email: string): Promise<User | null> => {
  const snapshot = await UserCollection.where("email", "==", email).get();
  if (snapshot.empty) {
    return null;
  } else {
    return snapshot.docs[0].data() as User;
  }
};

/**
 * Adds a new user to the Firestore collection.
 *
 * @param {Partial<User>} user - The user data to be added.
 *
 * @returns {Promise<{ id: string }>} - A promise that resolves to an object containing the new user's ID.
 */
export const addUser = async (user: Partial<User>): Promise<{ id: string }> => {
  const result = await UserCollection.add(user);
  return { id: result.id };
};


