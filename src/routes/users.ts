import { Router } from 'express';
import {
  getUser,
  getUsers,
  updateProfile,
  updateAvatar,
} from '../controllers/users';

export const userRouter = Router()
  .get('/', getUsers)
  .get('/:userId', getUser);

export const userProfileRouter = Router()
  .patch('/', updateProfile)
  .patch('/avatar', updateAvatar);
