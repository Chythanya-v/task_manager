import express from "express";
import dotenv from "dotenv";
import rootRouter from "./routes/index.js";

dotenv.config();

const app = express();
app.use(express.json());

app.use("/", rootRouter)

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});