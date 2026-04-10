import express from "express";
import dotenv from "dotenv";
import rootRouter from "./routes/index.js";
import cors from "cors";

dotenv.config();

const app = express();
app.use(cors({
    origin: (origin, callback) => {
        const allowedOrigins = ['https://task-manager-kappa-woad.vercel.app'];
        if (!origin || allowedOrigins.includes(origin) || origin.startsWith('http://localhost:')) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true
}))

app.use(express.json());
app.use("/", rootRouter)

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});