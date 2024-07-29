import {NextFunction, Request, Response} from "express";
import * as taskService from "../services/task.service";
import {ErrorHandler} from "../handlers/error.handler";
import {ResponseHandler} from "../handlers/response.handler";
import {Task} from "../models/task.interface";
import {log} from "firebase-functions/logger";
export const getTasks = async (
  _req: Request,
  _res: Response,
  next: NextFunction) => {
  try {
    const tasks: Task[] = await taskService.getTasks();
    if (tasks.length === 0) {
      next( new ErrorHandler(404, "Task not found"));
    }


    next(new ResponseHandler(200, tasks, "Tasks found"));
  } catch (err) {
    next(new ErrorHandler(500, "Internal server error"));
  }
};

export const addTask = async (
  req: Request,
  res: Response,
  next: NextFunction) => {
  try {
    const task = req.body;
    const newTask = await taskService.addTask(task);
    next(new ResponseHandler(201, newTask, "Task created"));
  } catch (error) {
    log(error);
    res.status(500).send({message: error});
  }
};

export const updateTask = async (
  req: Request,
  _res: Response,
  next: NextFunction
) => {
  try {
    const taskId = req.params.taskId;
    const task: Partial<Task> = req.body;
    await taskService.updateTask(taskId, task);
    next(new ResponseHandler(200, "Task updated"));
  } catch (error) {
    next(new ErrorHandler(500, "Internal server error"));
  }
};

export const deleteTask = async (
  req: Request,
  _res: Response,
  next: NextFunction) => {
  try {
    const taskId = req.params.taskId;
    await taskService.deleteTask(taskId);
    next(new ResponseHandler(200, "Task deleted"));
  } catch (error) {
    next(new ErrorHandler(500, "Internal server error"));
  }
};
