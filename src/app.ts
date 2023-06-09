// eslint-disable-next-line object-curly-newline
import express, { json, Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';

import {
  userRouter,
  usersRouter,
  newUserRouter,
  updatedAvatarRouter,
  updatedUserInfoRouter,
} from './routes/users';
import {
  cardRemovalRouter,
  newCardRouter,
  cardsRouter,
  cardDislikeRouter,
  cardLikeRouter,
} from './routes/cards';

import './interfaces/custom-request';

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

app.use('/users', newUserRouter);
app.use('/users', usersRouter);
app.use('/users', userRouter);
app.use('/users/me', updatedUserInfoRouter);
app.use('/users/me', updatedAvatarRouter);

app.use('/cards', newCardRouter);
app.use('/cards', cardsRouter);
app.use('/cards', cardRemovalRouter);
app.use('/cards', cardLikeRouter);
app.use('/cards', cardDislikeRouter);

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`App listening on port ${PORT}`);
});
