import { Router } from "express";
import authRouter from "./auth.js";
import taskRouter from "./tasks.js";

const rootRouter = Router();

rootRouter.use("/auth", authRouter);
rootRouter.use("/api", taskRouter);

export default rootRouter;