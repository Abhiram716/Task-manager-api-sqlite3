import express from "express";

import authenticateUser from "../middleware/authenticateUser.js";
import {
  createTask,
  deleteTaskById,
  getAllTasks,
  getTaskById,
  updateTaskById,
} from "../controllers/taskController.js";

const taskRouter = express.Router();

taskRouter.post("/", authenticateUser, createTask);
taskRouter.get("/", authenticateUser, getAllTasks);
taskRouter.get("/:id", authenticateUser, getTaskById);
taskRouter.put("/:id",authenticateUser,updateTaskById)
taskRouter.delete("/:id", authenticateUser, deleteTaskById);

export default taskRouter;
