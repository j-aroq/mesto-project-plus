import { Response, NextFunction } from 'express';
// eslint-disable-next-line import/no-extraneous-dependencies
import jwt from 'jsonwebtoken';
import { statusCode401 } from '../constants/status';
import { IUserRequest } from '../utils/custom-request';

// eslint-disable-next-line consistent-return
export default (req: IUserRequest, res: Response, next: NextFunction) => {
  try {
    const authorization = req.cookies.jwt;

    if (!authorization) {
      return res
        .status(statusCode401)
        .send({ message: 'Необходима авторизация' });
    }

    const payload = jwt.verify(authorization, 'strong-secret');
    req.user = payload;
  } catch (err) {
    return res
      .status(statusCode401)
      .send({ message: 'Необходима авторизация' });
  }

  next();
};
