/* eslint-disable import/no-extraneous-dependencies */
import express, { json } from 'express';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import { userRouter, userProfileRouter } from './routes/users';
import cardRouter from './routes/cards';
import { login, createUser } from './controllers/users';
import auth from './middlewares/auth';
import { requestLogger, errorLogger } from './middlewares/logger';
import { validateCreateUser, validateLogin } from './validation/user';
import celebrateErrorHandler from './middlewares/celebrate-handle-errors';
import errorHandler from './middlewares/handle-errors';
import Error404 from './errors/error404';

const { PORT = 3000 } = process.env;

const app = express();

mongoose.connect('mongodb://127.0.0.1:27017/mestodb');

app.use(json());
app.use(express.urlencoded({ extended: true }));
app.use(requestLogger);

app.post('/signin', validateLogin, login);
app.post('/signup', validateCreateUser, createUser);

app.use(cookieParser());
app.use(auth);

app.use('/users/me', userProfileRouter);
app.use('/users', userRouter);

app.use('/cards', cardRouter);

app.use(() => {
  throw new Error404('Маршрут не найден');
});

app.use(errorLogger);

app.use(celebrateErrorHandler);

app.use(errorHandler);

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`App listening on port ${PORT}`);
});
