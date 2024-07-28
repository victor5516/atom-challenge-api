import {Router} from "express";
import {
  getTasks,
  addTask,
  updateTask,
  deleteTask} from "../controllers/task.controller";
import {createTaskValidation} from "../middlewares/task.middleware";
const router = Router();

router.get("/", getTasks);
router.post("/", [createTaskValidation], addTask);
router.put("/:taskId", updateTask);
router.delete("/:taskId", deleteTask);

export default router;
