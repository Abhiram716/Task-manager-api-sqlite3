import cors from "cors";
import express from "express";
import dotenv from "dotenv";

import { sequelize } from "./db.js";
import userRouter from "./routes/user.router.js";
import taskRouter from "./routes/task.router.js";

dotenv.config();

const app = express();

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

sequelize.sync().then(() => {
  console.log("db is ready");
});

app.use("/user", userRouter);
app.use("/tasks", taskRouter);

app.get("/", async (req, res) => {
  res.send("Hello world");
});

app.listen(process.env.PORT | 8000);
