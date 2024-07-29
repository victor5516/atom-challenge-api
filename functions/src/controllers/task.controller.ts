import { NextFunction, Request, Response } from "express";
import * as taskService from "../services/task.service";
import { ErrorHandler } from "../handlers/error.handler";
import { ResponseHandler } from "../handlers/response.handler";
import { Task } from "../models/task.interface";
import { log } from "firebase-functions/logger";

/**
 * Gets all tasks from the database.
 *
 * @param {Request} _req - The request object.
 * @param {Response} _res - The response object.
 * @param {NextFunction} next - The next middleware function.
 *
 * @returns {Promise<void>} - A promise that resolves when the tasks are retrieved.
 */
export const getTasks = async (
  _req: Request,
  _res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const tasks: Task[] = await taskService.getTasks();
    if (tasks.length === 0) {
      next(new ErrorHandler(404, "Tasks not found"));
    } else {
      next(new ResponseHandler(200, tasks, "Tasks found"));
    }
  } catch (err) {
    next(new ErrorHandler(500, "Internal server error"));
  }
};

/**
 * Adds a new task to the database.
 *
 * @param {Request} req - The request object containing the task data.
 * @param {Response} res - The response object.
 * @param {NextFunction} next - The next middleware function.
 *
 * @returns {Promise<void>} - A promise that resolves when the task is added.
 */
export const addTask = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const task = req.body;
    const newTask = await taskService.addTask(task);
    next(new ResponseHandler(201, newTask, "Task created"));
  } catch (error) {
    log(error);
    res.status(500).send({ message: error });
  }
};

/**
 * Updates an existing task in the database.
 *
 * @param {Request} req - The request object containing the task data.
 * @param {Response} _res - The response object.
 * @param {NextFunction} next - The next middleware function.
 *
 * @returns {Promise<void>} - A promise that resolves when the task is updated.
 */
export const updateTask = async (
  req: Request,
  _res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const taskId = req.params.taskId;
    const task: Partial<Task> = req.body;
    await taskService.updateTask(taskId, task);
    next(new ResponseHandler(200, "Task updated"));
  } catch (error) {
    next(new ErrorHandler(500, "Internal server error"));
  }
};

/**
 * Deletes a task from the database.
 *
 * @param {Request} req - The request object containing the task ID.
 * @param {Response} _res - The response object.
 * @param {NextFunction} next - The next middleware function.
 *
 * @returns {Promise<void>} - A promise that resolves when the task is deleted.
 */
export const deleteTask = async (
  req: Request,
  _res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const taskId = req.params.taskId;
    await taskService.deleteTask(taskId);
    next(new ResponseHandler(200, "Task deleted"));
  } catch (error) {
    next(new ErrorHandler(500, "Internal server error"));
  }
};
