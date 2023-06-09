import { Request, Response, NextFunction } from 'express';
import Card from '../models/card';
import { statusCode200 } from '../constants/status';
import handleErrors from '../utils/handle-errors';

export const createCard = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const card = await Card.create({
      name: req.body.name,
      link: req.body.link,
      owner: req.user._id,
    });
    res.status(statusCode200).send(card);
  } catch (err) {
    handleErrors(res, err);
    next(err);
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
    handleErrors(res, err);
    next(err);
  }
};

export const deleteCard = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const card = await Card.findByIdAndDelete(req.params.cardId);
    res.status(statusCode200).send(card);
  } catch (err) {
    handleErrors(res, err);
    next(err);
  }
};

export const likeCard = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const card = await Card.findByIdAndUpdate(
      req.params.cardId,
      { $addToSet: { likes: req.user._id } },
      { new: true },
    );
    res.status(statusCode200).send(card);
  } catch (err) {
    handleErrors(res, err);
    next(err);
  }
};

export const dislikeCard = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const card = await Card.findByIdAndUpdate(
      req.params.cardId,
      { $pull: { likes: req.user._id } },
      { new: true },
    );
    res.status(statusCode200).send(card);
  } catch (err) {
    handleErrors(res, err);
    next(err);
  }
};
