import { Router } from 'express';
import {
  getUserById,
  getUsers,
  updateProfile,
  updateAvatar,
  getUserProfile,
} from '../controllers/users';

export const userRouter = Router()
  .get('/', getUsers)
  .get('/:userId', getUserById);

export const userProfileRouter = Router()
  .get('/', getUserProfile)
  .patch('/', updateProfile)
  .patch('/avatar', updateAvatar);
