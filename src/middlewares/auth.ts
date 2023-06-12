import { Response, NextFunction } from 'express';
// eslint-disable-next-line import/no-extraneous-dependencies
import jwt from 'jsonwebtoken';
import { statusCode401 } from '../constants/status';
import { IUserRequest } from '../utils/custom-request';

// eslint-disable-next-line consistent-return
export default (req: IUserRequest, res: Response, next: NextFunction) => {
  const authorization = req.cookies.jwt;

  if (!authorization) {
    return res
      .status(statusCode401)
      .send({ message: 'Необходима авторизация' });
  }
  // const { authorization } = req.headers;

  // if (!authorization || !authorization.startsWith('Bearer ')) {
  //   return res
  //     .status(statusCode401)
  //     .send({ message: 'Необходима авторизация' });
  // }
  // const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(authorization, 'strong-secret');
  } catch (err) {
    return res
      .status(statusCode401)
      .send({ message: 'Необходима авторизация' });
  }

  req.user = payload;

  next();
};
