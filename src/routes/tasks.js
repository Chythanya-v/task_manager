import { Router } from "express";
import { createTask, getTasks, updateTask, deleteTask } from "../controllers/tasks.js";
import { authenticate } from "../middleware/auth.js";

const taskRouter = Router();

// All task routes require a valid JWT
taskRouter.use(authenticate);

taskRouter.get("/tasks", getTasks);
taskRouter.post("/tasks", createTask);
taskRouter.put("/tasks/:id", updateTask);
taskRouter.delete("/tasks/:id", deleteTask);

export default taskRouter;