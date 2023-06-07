import { Response } from 'express';
import mongoose from 'mongoose';
import {
  statusCode400,
  statusCode404,
  statusCode500,
} from '../constants/status';

export default function handleErrors(res: Response, err: any) {
  if (err instanceof mongoose.Error.CastError) {
    res.status(statusCode404).send({ message: 'Объект не найден' });
  } else if (err instanceof mongoose.Error.ValidationError) {
    res
      .status(statusCode400)
      .send({ message: 'Переданы некорректные данные' });
  }
  res.status(statusCode500).send({ message: ' Ошибка по умолчанию' });
}
