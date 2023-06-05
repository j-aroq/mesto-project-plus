import { Request, Response, NextFunction } from "express";

import User from "../models/user";

export const getUsers = (req: Request, res: Response, next: NextFunction) => {
  return User.find({})
    .then((users) => res.send({ data: users }))
    .catch((err) => {
      res.status(500).send({ error: err.message });
      next(err);
    });
};

export const getUser = (req: Request, res: Response, next: NextFunction) => {
  const userId = req.params.userId;
  return User.find({ _id: userId })
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      res.status(500).send({ error: err.message });
      next(err);
    });
};

export const createUser = (req: Request, res: Response, next: NextFunction) => {
  User.create({
    name: req.body.name,
    about: req.body.about,
    avatar: req.body.avatar,
  })
    .then((user) => res.status(201).send(user))
    .catch((err) => {
      res.status(400).send({ error: err.message });
      next(err);
    });
};
