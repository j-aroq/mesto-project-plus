import { Router } from "express";
import { getUser, getUsers, createUser } from "../controllers/users";

const router = Router();

// router.use((req, res, next) => {
//   console.log("Time: ", Date.now());
//   next();
// });

export const usersRouter = router.get("/", getUsers);
export const userRouter = router.get("/:userId", getUser);
export const newUserRouter = router.post("/", createUser);
