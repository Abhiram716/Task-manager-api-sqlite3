import express from 'express';

import {
  createTask,
  deleteTaskById,
  getAllTasks,
  getTaskById,
  updateTaskById,
} from '../controllers/taskController.js';
import authenticateUser from '../middleware/authenticateUser.js';
import verifyIsAdmin from '../middleware/verifyAdmin.js';
import { verifyToken } from '../middleware/verifyToken.js';

const taskRouter = express.Router();

taskRouter.post('/', verifyToken, authenticateUser, verifyIsAdmin, createTask);
taskRouter.get('/', verifyToken, authenticateUser, getAllTasks);
taskRouter.get('/:id', verifyToken, authenticateUser, getTaskById);
taskRouter.put(
  '/:id',
  verifyToken,
  authenticateUser,
  verifyIsAdmin,
  updateTaskById,
);
taskRouter.delete(
  '/:id',
  verifyToken,
  authenticateUser,
  verifyIsAdmin,
  deleteTaskById,
);

export default taskRouter;
