import { NextFunction, Request, Response } from 'express';
import { statusCode500 } from '../constants/status';

export interface IError {
  statusCode: number;
  message: string;
}

export default function errorHandler(
  err: IError,
  req: Request,
  res: Response,
  // eslint-disable-next-line no-unused-vars
  next: NextFunction,
) {
  const { statusCode = statusCode500, message } = err;

  res.status(statusCode).json({
    message: statusCode === statusCode500
      ? 'Ошибка по умолчанию' : message,
  });
}
