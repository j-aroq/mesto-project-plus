/* eslint-disable import/no-extraneous-dependencies */
import { MongooseError } from 'mongoose';
import { NextFunction, Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/user';
import { statusCode200 } from '../constants/status';
import { IUserRequest } from '../utils/custom-request';
import Error404 from '../errors/error404';
import Error409 from '../errors/error409';
import Error400 from '../errors/error400';

export const getUsers = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const users = await User.find({});
    res.status(statusCode200).send(users);
  } catch (err) {
    next(err);
  }
};

export const getUserById = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) {
      throw new Error404('Пользователь не найден');
    }
    res.status(statusCode200).send(user);
  } catch (err) {
    if ((err instanceof Error || err instanceof MongooseError) && err.name === 'CastError') {
      next(new Error400('Переданы некорректные данные'));
    } else {
      next(err);
    }
  }
};

export const getUserProfile = async (
  req: IUserRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { _id } = req.user as {_id: string};
    const user = await User.findById(_id);
    if (!user) {
      throw new Error404('Пользователь не найден');
    }
    res.status(statusCode200).send(user);
  } catch (err) {
    if ((err instanceof Error || err instanceof MongooseError) && err.name === 'CastError') {
      next(new Error400('Переданы некорректные данные'));
    } else {
      next(err);
    }
  }
};

export const createUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const hash = await bcrypt.hash(req.body.password, 10);
    const newUser = await User.create({
      ...req.body, password: hash,
    });
    res.status(statusCode200).send(newUser);
  } catch (err: any) {
    if (err.code === 11000) {
      next(new Error409('Пользователь с таким email существует'));
    } else {
      next(err);
    }
  }
};

export const updateProfile = async (
  req: IUserRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { name, about } = req.body;
    const { _id } = req.user as {_id: string};
    const user = await User.findByIdAndUpdate(
      _id,
      { name, about },
      {
        new: true,
        runValidators: true,
      },
    );
    if (!user) {
      throw new Error404('Пользователь не найден');
    }
    res.status(statusCode200).send(user);
  } catch (err) {
    if ((err instanceof Error || err instanceof MongooseError) && err.name === 'ValidationError') {
      next(new Error400('Переданы некорректные данные'));
    } else {
      next(err);
    }
  }
};

export const updateAvatar = async (
  req: IUserRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { avatar } = req.body;
    const { _id } = req.user as {_id: string};
    const user = await User.findByIdAndUpdate(
      _id,
      { avatar },
      {
        new: true,
        runValidators: true,
      },
    );
    if (!user) {
      throw new Error404('Пользователь не найден');
    }
    res.status(statusCode200).send(user);
  } catch (err) {
    if ((err instanceof Error || err instanceof MongooseError) && err.name === 'ValidationError') {
      next(new Error400('Переданы некорректные данные'));
    } else {
      next(err);
    }
  }
};

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction,
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
    next(err);
  }
};
