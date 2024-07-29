import { Task } from "../models/task.interface";
import { DateTime } from "luxon";
import { db } from "../config/firestore";

const TaskCollection = db.collection("tasks");

/**
 * Retrieves all tasks from the Firestore collection, ordered by creation date in descending order.
 *
 * @returns {Promise<Task[]>} - A promise that resolves to an array of tasks.
 */
export const getTasks = async (): Promise<Task[]> => {
  const result = await TaskCollection.orderBy("createdAt", "desc").get();
  const tasks = result.docs.map((doc) => ({ id: doc.id, ...doc.data() }) as Task);
  return tasks;
};

/**
 * Adds a new task to the Firestore collection.
 *
 * @param {Partial<Task>} task - The task data to be added.
 *
 * @returns {Promise<{ id: string }>} - A promise that resolves to an object containing the new task's ID.
 */
export const addTask = async (task: Partial<Task>): Promise<{ id: string }> => {
  const result = await TaskCollection.add({
    ...task,
    completed: false,
    createdAt: DateTime.now().toISO(),
  });
  return { id: result.id };
};

/**
 * Updates an existing task in the Firestore collection.
 *
 * @param {string} taskId - The ID of the task to be updated.
 * @param {Partial<Task>} task - The updated task data.
 *
 * @returns {Promise<void>} - A promise that resolves when the task is updated.
 */
export const updateTask = async (
  taskId: string,
  task: Partial<Task>
): Promise<void> => {
  await TaskCollection.doc(taskId).update(task);
};

/**
 * Deletes a task from the Firestore collection.
 *
 * @param {string} taskId - The ID of the task to be deleted.
 *
 * @returns {Promise<void>} - A promise that resolves when the task is deleted.
 */
export const deleteTask = async (taskId: string): Promise<void> => {
  await TaskCollection.doc(taskId).delete();
};
