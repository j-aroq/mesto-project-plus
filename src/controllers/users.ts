import { Error as MongooseError } from 'mongoose';
import { Request, Response } from 'express';
// eslint-disable-next-line import/no-extraneous-dependencies
import bcrypt from 'bcryptjs';
// eslint-disable-next-line import/no-extraneous-dependencies
import jwt from 'jsonwebtoken';
import User from '../models/user';
import handleErrors from '../utils/handle-errors';
import { statusCode200 } from '../constants/status';
import { IUserIdRequest, IUserRequest } from '../utils/custom-request';

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

export const getUserById = async (
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

export const getUserProfile = async (
  req: IUserRequest,
  res: Response,
) => {
  try {
    const { _id } = req.user as IUserIdRequest;
    const user = await User.findById(_id);
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
    const emailExist = await User.findOne({ email: req.body.email });
    if (emailExist) {
      const error = new Error('Пользователь с таким email существует');
      error.name = 'ConflictError';
      throw error;
    }
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
  req: IUserRequest,
  res: Response,
) => {
  try {
    const { name, about } = req.body;
    const { _id } = req.user as IUserIdRequest;
    const user = await User.findByIdAndUpdate(
      _id,
      { name, about },
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
  req: IUserRequest,
  res: Response,
) => {
  try {
    const { avatar } = req.body;
    const { _id } = req.user as IUserIdRequest;
    const user = await User.findByIdAndUpdate(
      _id,
      { avatar },
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
