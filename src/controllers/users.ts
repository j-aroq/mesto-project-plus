import { Request, Response } from 'express';
import User from '../models/user';
import handleErrors from '../utils/handle-errors';
import { statusCode200 } from '../constants/status';

export const getUsers = async (
  req: Request,
  res: Response,
) => {
  try {
    const users = await User.find({});
    res.status(statusCode200).send(users);
  } catch (err) {
    handleErrors(res, err);
  }
};

export const getUser = async (
  req: Request,
  res: Response,
) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) {
      const error = new Error('Пользователь не найден');
      throw error;
    }
    res.status(statusCode200).send(user);
  } catch (err) {
    handleErrors(res, err);
  }
};

export const createUser = async (
  req: Request,
  res: Response,
) => {
  try {
    const newUser = await User.create(req.body);
    res.status(statusCode200).send(newUser);
  } catch (err) {
    handleErrors(res, err);
  }
};

export const updateProfile = async (
  req: Request,
  res: Response,
) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.user._id,
      {
        name: req.body.name,
        about: req.body.about,
      },
      {
        new: true,
      },
    );
    res.status(statusCode200).send(user);
  } catch (err) {
    handleErrors(res, err);
  }
};

export const updateAvatar = async (
  req: Request,
  res: Response,
) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.user._id,
      {
        avatar: req.body.avatar,
      },
      {
        new: true,
      },
    );
    res.status(statusCode200).send(user);
  } catch (err) {
    handleErrors(res, err);
  }
};
