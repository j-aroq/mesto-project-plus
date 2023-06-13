/* eslint-disable import/no-extraneous-dependencies */
import express, {
  json, Request, Response,
} from 'express';
import { errors } from 'celebrate';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import { statusCode404 } from './constants/status';
import { userRouter, userProfileRouter } from './routes/users';
import cardRouter from './routes/cards';
import { login, createUser } from './controllers/users';
import auth from './middlewares/auth';
import { requestLogger, errorLogger } from './middlewares/logger';
import { validateCreateUser, validateLogin } from './validation/user';
import celebrateErrorHandler from './utils/celebrate-handle-errors';

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

app.use(errorLogger);

app.use(celebrateErrorHandler);
app.use(errors());

app.use((req: Request, res: Response) => {
  res.status(statusCode404).send({ message: 'Маршрут не найден' });
});

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`App listening on port ${PORT}`);
});
