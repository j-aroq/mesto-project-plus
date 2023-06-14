import { Response, NextFunction } from 'express';
// eslint-disable-next-line import/no-extraneous-dependencies
import jwt from 'jsonwebtoken';
import Error401 from '../errors/error401';
import { IUserRequest } from '../utils/custom-request';

// eslint-disable-next-line consistent-return
export default (req: IUserRequest, res: Response, next: NextFunction) => {
  try {
    const authorization = req.cookies.jwt;

    if (!authorization) {
      throw new Error401('Необходима авторизация');
    }

    const payload = jwt.verify(authorization, 'strong-secret');
    req.user = payload as {_id: string};
  } catch (err) {
    throw new Error401('Необходима авторизация');
  }

  next();
};
