import {Task} from "../models/task.interface";
import {DateTime} from "luxon";
import {db} from "../config/firestore";

const TaskCollection = db.collection("tasks");

export const getTasks = async (): Promise<Task[]> => {
  const result = await TaskCollection.orderBy("createdAt", "desc").get();
  const tasks = result.docs
    .map((doc) => ({id: doc.id, ...doc.data()}) as Task);
  return tasks;
};

export const addTask = async (task: Task): Promise<{ id: string }> => {
  const result = await TaskCollection.add({
    ...task,
    completed: false,
    createdAt: DateTime.now().toISO(),
  });
  return {id: result.id};
};

export const updateTask = async (
  taskId: string,
  task: Partial<Task>
): Promise<void> => {
  await TaskCollection.doc(taskId).update(task);
};

export const deleteTask = async (taskId: string): Promise<void> => {
  await TaskCollection.doc(taskId).delete();
};
