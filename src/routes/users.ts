import { Router } from 'express';
import {
  getUserById,
  getUsers,
  updateProfile,
  updateAvatar,
  getUserProfile,
} from '../controllers/users';
import { validateUpdateAvatar, validateUpdateProfile, validateUserdId } from '../validation/user';

export const userRouter = Router()
  .get('/', getUsers)
  .get('/:userId', validateUserdId, getUserById);

export const userProfileRouter = Router()
  .get('/', getUserProfile)
  .patch('/', validateUpdateProfile, updateProfile)
  .patch('/avatar', validateUpdateAvatar, updateAvatar);
