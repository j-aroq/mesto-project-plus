import { Response } from 'express';
import mongoose, { Error as MongooseError } from 'mongoose';
import {
  statusCode400,
  statusCode404,
  statusCode500,
} from '../constants/status';

export default function handleErrors(res: Response, err: Error | MongooseError) {
  if (err instanceof Error && err.name === 'NotFound') {
    res.status(statusCode404).send({ message: err.message });
  } else if (err instanceof mongoose.Error.ValidationError
    || err instanceof mongoose.Error.CastError) {
    res
      .status(statusCode400)
      .send({ message: 'Переданы некорректные данные' });
  } else {
    res.status(statusCode500).send({ message: ' Ошибка по умолчанию' });
  }
}
