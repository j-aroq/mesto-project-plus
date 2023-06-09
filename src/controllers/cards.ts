import { Error as MongooseError } from 'mongoose';
import { Request, Response } from 'express';
import Card from '../models/card';
import { statusCode200 } from '../constants/status';
import handleErrors from '../utils/handle-errors';

export const createCard = async (
  req: Request,
  res: Response,
) => {
  try {
    const card = await Card.create({
      name: req.body.name,
      link: req.body.link,
      owner: req.user._id,
    });
    res.status(statusCode200).send(card);
  } catch (err) {
    if (err instanceof Error || err instanceof MongooseError) {
      handleErrors(res, err);
    }
  }
};

export const getCards = async (
  req: Request,
  res: Response,
) => {
  try {
    const cards = await Card.find({});
    res.status(statusCode200).send(cards);
  } catch (err) {
    if (err instanceof Error || err instanceof MongooseError) {
      handleErrors(res, err);
    }
  }
};

export const deleteCard = async (
  req: Request,
  res: Response,
) => {
  try {
    const card = await Card.findByIdAndDelete(req.params.cardId);
    if (!card) {
      const error = new Error('Карточка не найдена');
      error.name = 'NotFound';
      throw error;
    }
    res.status(statusCode200).send(card);
  } catch (err) {
    if (err instanceof Error || err instanceof MongooseError) {
      handleErrors(res, err);
    }
  }
};

export const likeCard = async (
  req: Request,
  res: Response,
) => {
  try {
    const card = await Card.findByIdAndUpdate(
      req.params.cardId,
      { $addToSet: { likes: req.user._id } },
      { new: true },
    );
    if (!card) {
      const error = new Error('Карточка не найдена');
      error.name = 'NotFound';
      throw error;
    }
    res.status(statusCode200).send(card);
  } catch (err) {
    if (err instanceof Error || err instanceof MongooseError) {
      handleErrors(res, err);
    }
  }
};

export const dislikeCard = async (
  req: Request,
  res: Response,
) => {
  try {
    const card = await Card.findByIdAndUpdate(
      req.params.cardId,
      { $pull: { likes: req.user._id } },
      { new: true },
    );
    if (!card) {
      const error = new Error('Карточка не найдена');
      error.name = 'NotFound';
      throw error;
    }
    res.status(statusCode200).send(card);
  } catch (err) {
    if (err instanceof Error || err instanceof MongooseError) {
      handleErrors(res, err);
    }
  }
};
