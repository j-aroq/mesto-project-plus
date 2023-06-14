import { Error as MongooseError } from 'mongoose';
import { Request, Response, NextFunction } from 'express';
import Card from '../models/card';
import { statusCode200 } from '../constants/status';
import { IUserRequest } from '../utils/custom-request';
import Error404 from '../errors/error404';
import Error400 from '../errors/error400';
import Error403 from '../errors/error403';

export const createCard = async (
  req: IUserRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { name, link } = req.body;
    const { _id } = req.user as {_id: string};
    const card = await Card.create({
      name, link, owner: _id,
    });
    res.status(statusCode200).send(card);
  } catch (err) {
    if ((err instanceof Error || err instanceof MongooseError) && err.name === 'ValidationError') {
      next(new Error400('Переданы некорректные данные'));
    } else {
      next(err);
    }
  }
};

export const getCards = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const cards = await Card.find({});
    res.status(statusCode200).send(cards);
  } catch (err) {
    next(err);
  }
};

export const deleteCard = async (
  req: IUserRequest,
  res: Response,
  next: NextFunction,
) => {
  const { _id } = req.user as {_id: string};
  try {
    const card = await Card.findById(req.params.cardId);
    if (!card) {
      throw new Error404('Карточка не найдена');
    }
    if (card?.owner.toString() !== _id.toString()) {
      throw new Error403('Можно удалять только свои карточки!');
    }
    await card.remove();
    res.status(statusCode200).send(card);
  } catch (err) {
    if ((err instanceof Error || err instanceof MongooseError) && err.name === 'CastError') {
      next(new Error400('Переданы некорректные данные'));
    } else {
      next(err);
    }
  }
};

export const likeCard = async (
  req: IUserRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { _id } = req.user as {_id: string};
    const card = await Card.findByIdAndUpdate(
      req.params.cardId,
      { $addToSet: { likes: _id } },
      { new: true },
    );
    if (!card) {
      throw new Error404('Карточка не найдена');
    }
    res.status(statusCode200).send(card);
  } catch (err) {
    if ((err instanceof Error || err instanceof MongooseError) && err.name === 'CastError') {
      next(new Error400('Переданы некорректные данные'));
    } else {
      next(err);
    }
  }
};

export const dislikeCard = async (
  req: IUserRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { _id } = req.user as {_id: string};
    const card = await Card.findByIdAndUpdate(
      req.params.cardId,
      { $pull: { likes: _id } },
      { new: true },
    );
    if (!card) {
      throw new Error404('Карточка не найдена');
    }
    res.status(statusCode200).send(card);
  } catch (err) {
    if ((err instanceof Error || err instanceof MongooseError) && err.name === 'CastError') {
      next(new Error400('Переданы некорректные данные'));
    } else {
      next(err);
    }
  }
};
