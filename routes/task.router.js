import express from "express";

import authenticateUser from "../middleware/authenticateUser.js";
import {
  createTask,
  deleteTaskById,
  getAllTasks,
  getTaskById,
  updateTaskById,
} from "../controllers/taskController.js";
import verifyIsAdmin from "../middleware/verifyAdmin.js";

const taskRouter = express.Router();

taskRouter.post("/", authenticateUser, verifyIsAdmin, createTask);
taskRouter.get("/", authenticateUser, getAllTasks);
taskRouter.get("/:id", authenticateUser, getTaskById);
taskRouter.put("/:id", authenticateUser, verifyIsAdmin, updateTaskById);
taskRouter.delete("/:id", authenticateUser, verifyIsAdmin, deleteTaskById);

export default taskRouter;
