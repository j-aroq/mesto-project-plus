import { Router } from "express";
import {
  getUser,
  getUsers,
  createUser,
  updateProfile,
  updateAvatar,
} from "../controllers/users";

const router = Router();

export const usersRouter = router.get("/", getUsers);
export const userRouter = router.get("/:userId", getUser);
export const newUserRouter = router.post("/", createUser);
export const updatedUserInfoRouter = router.patch("/", updateProfile);
export const updatedAvatarRouter = router.patch("/", updateAvatar);
