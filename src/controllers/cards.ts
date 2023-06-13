import { Error as MongooseError } from 'mongoose';
import { Request, Response } from 'express';
import Card from '../models/card';
import { statusCode200 } from '../constants/status';
import handleErrors from '../utils/handle-errors';
import { IUserIdRequest, IUserRequest } from '../utils/custom-request';

export const createCard = async (
  req: IUserRequest,
  res: Response,
) => {
  try {
    const { name, link } = req.body;
    const { _id } = req.user as IUserIdRequest;
    const card = await Card.create({
      name, link, owner: _id,
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
  req: IUserRequest,
  res: Response,
) => {
  const { _id } = req.user as IUserIdRequest;
  try {
    const card = await Card.findById(req.params.cardId);
    if (!card) {
      const error = new Error('Карточка не найдена');
      error.name = 'NotFound';
      throw error;
    }
    if (card?.owner.toString() !== _id.toString()) {
      const error = new Error('Можно удалять только свои карточки!');
      error.name = 'Forbidden';
      throw error;
    }
    await card.remove();
    res.status(statusCode200).send(card);
  } catch (err) {
    if (err instanceof Error || err instanceof MongooseError) {
      handleErrors(res, err);
    }
  }
};

export const likeCard = async (
  req: IUserRequest,
  res: Response,
) => {
  try {
    const { _id } = req.user as IUserIdRequest;
    const card = await Card.findByIdAndUpdate(
      req.params.cardId,
      { $addToSet: { likes: _id } },
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
  req: IUserRequest,
  res: Response,
) => {
  try {
    const { _id } = req.user as IUserIdRequest;
    const card = await Card.findByIdAndUpdate(
      req.params.cardId,
      { $pull: { likes: _id } },
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
