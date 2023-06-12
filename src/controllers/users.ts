import { Error as MongooseError } from 'mongoose';
import { Request, Response } from 'express';
// eslint-disable-next-line import/no-extraneous-dependencies
import bcrypt from 'bcryptjs';
// eslint-disable-next-line import/no-extraneous-dependencies
import jwt from 'jsonwebtoken';
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
    if (err instanceof Error || err instanceof MongooseError) {
      handleErrors(res, err);
    }
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
      error.name = 'NotFound';
      throw error;
    }
    res.status(statusCode200).send(user);
  } catch (err) {
    if (err instanceof Error || err instanceof MongooseError) {
      handleErrors(res, err);
    }
  }
};

export const createUser = async (
  req: Request,
  res: Response,
) => {
  try {
    const hash = await bcrypt.hash(req.body.password, 10);
    const newUser = await User.create({
      ...req.body, password: hash,
    });
    res.status(statusCode200).send(newUser);
  } catch (err) {
    if (err instanceof Error || err instanceof MongooseError) {
      handleErrors(res, err);
    }
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
        runValidators: true,
      },
    );
    if (!user) {
      const error = new Error('Пользователь не найден');
      error.name = 'NotFound';
      throw error;
    }
    res.status(statusCode200).send(user);
  } catch (err) {
    if (err instanceof Error || err instanceof MongooseError) {
      handleErrors(res, err);
    }
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
        runValidators: true,
      },
    );
    if (!user) {
      const error = new Error('Пользователь не найден');
      error.name = 'NotFound';
      throw error;
    }
    res.status(statusCode200).send(user);
  } catch (err) {
    if (err instanceof Error || err instanceof MongooseError) {
      handleErrors(res, err);
    }
  }
};

export const login = async (
  req: Request,
  res: Response,
) => {
  const { email, password } = req.body;
  try {
    const user = await User.findUserByCredentials(email, password);
    const token = jwt.sign({ _id: user._id }, 'strong-secret', { expiresIn: '7d' });
    res.status(statusCode200).cookie('jwt', token, {
      maxAge: 3600000 * 24 * 7,
      httpOnly: true,
      sameSite: true,
    }).send({ token });
  } catch (err) {
    if (err instanceof Error || err instanceof MongooseError) {
      handleErrors(res, err);
    }
  }
};
