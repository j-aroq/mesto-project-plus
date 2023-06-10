import { Router } from 'express';
import {
  getUser,
  getUsers,
  createUser,
  updateProfile,
  updateAvatar,
} from '../controllers/users';

export const userRouter = Router()
  .get('/', getUsers)
  .get('/:userId', getUser)
  .post('/', createUser);

export const userProfileRouter = Router()
  .patch('/', updateProfile)
  .patch('/avatar', updateAvatar);
