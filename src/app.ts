import express, { json } from "express";
import mongoose from "mongoose";
import { userRouter, usersRouter, newUserRouter } from "./routes/users";

const { PORT = 3000 } = process.env;

const app = express();

mongoose.connect("mongodb://127.0.0.1:27017/mestodb");

app.use(json());
app.use(express.urlencoded({ extended: true }));

app.use("/users", newUserRouter);
app.use("/users", usersRouter);
app.use("/users", userRouter);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
