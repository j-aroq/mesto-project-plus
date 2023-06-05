import { Request, Response, NextFunction } from "express";
import Card from "../models/card";

export const createCard = (req: Request, res: Response, next: NextFunction) => {
  console.log(req.user._id);
  Card.create({
    name: req.body.name,
    link: req.body.link,
    owner: req.user._id,
  })
    .then((card) => res.status(201).send(card))
    .catch((err) => {
      res.status(400).send({ error: err.message });
      next(err);
    });
};

export const getCards = (req: Request, res: Response, next: NextFunction) => {
  return Card.find({})
    .then((cards) => res.send({ data: cards }))
    .catch((err) => {
      res.status(500).send({ error: err.message });
      next(err);
    });
};

export const deleteCard = (req: Request, res: Response, next: NextFunction) => {
  return Card.findByIdAndDelete(req.params.cardId)
    .then((card) => res.send({ data: card }))
    .catch((err) => {
      res.status(500).send({ error: err.message });
      next(err);
    });
};

export const likeCard = (req: Request, res: Response, next: NextFunction) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true }
  )
    .then((card) => res.status(201).send({ data: card }))
    .catch((err) => {
      res.status(500).send({ error: err.message });
      next(err);
    });
};

export const dislikeCard = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true }
  )
    .then((card) => res.status(201).send({ data: card }))
    .catch((err) => {
      res.status(500).send({ error: err.message });
      next(err);
    });
};
