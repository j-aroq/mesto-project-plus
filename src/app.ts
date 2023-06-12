// eslint-disable-next-line object-curly-newline
import express, { json, Request, Response } from 'express';
import mongoose from 'mongoose';
import { userRouter, userProfileRouter } from './routes/users';
import cardRouter from './routes/cards';
import { login, createUser } from './controllers/users';
import auth from './middlewares/auth';

const { PORT = 3000 } = process.env;

const app = express();

mongoose.connect('mongodb://127.0.0.1:27017/mestodb');

app.use(json());
app.use(express.urlencoded({ extended: true }));

app.post('/signin', login);
app.post('/signup', createUser);

app.use(auth);

app.use('/users', userRouter);
app.use('/users/me', userProfileRouter);
app.use('/cards', cardRouter);

app.use((req: Request, res: Response) => {
  res.status(404).send({ message: 'Маршрут не найден' });
});

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`App listening on port ${PORT}`);
});
