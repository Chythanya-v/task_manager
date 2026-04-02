import { Router } from "express";
import { createTask, getTasks, updateTask, deleteTask } from "../controllers/tasks";

const taskRouter = Router();

taskRouter.get("/tasks", getTasks);
taskRouter.post("/tasks", createTask);
taskRouter.put("/tasks/:id", updateTask);
taskRouter.delete("/tasks/:id", deleteTask);