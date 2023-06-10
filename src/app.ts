// eslint-disable-next-line object-curly-newline
import express, { json, Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
import { userRouter, userProfileRouter } from './routes/users';
import cardRouter from './routes/cards';
import './utils/custom-request';

const { PORT = 3000 } = process.env;

const app = express();

mongoose.connect('mongodb://127.0.0.1:27017/mestodb');

app.use(json());
app.use(express.urlencoded({ extended: true }));

app.use((req: Request, res: Response, next: NextFunction) => {
  req.user = {
    _id: '647de6565d08b8c2606d33ca',
  };
  next();
});

app.use('/users', userRouter);
app.use('/users/me', userProfileRouter);
app.use('/cards', cardRouter);

app.use((req: Request, res: Response, next: NextFunction) => {
  const notFoundRoute = new Error('Маршрут не найден');
  next(notFoundRoute.message);
});

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`App listening on port ${PORT}`);
});
