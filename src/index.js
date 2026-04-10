import express from "express";
import dotenv from "dotenv";
import rootRouter from "./routes/index.js";
import cors from "cors";

dotenv.config();

const app = express();
app.use(cors({
    origin: 'https://task-manager-kappa-woad.vercel.app',
    credentials: true
}))

app.use(express.json());
app.use("/", rootRouter)

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});