// eslint-disable-next-line import/no-extraneous-dependencies
import { celebrate, Joi } from 'celebrate';
import { isObjectIdOrHexString } from 'mongoose';
import Error400 from '../errors/error400';

export const validateUserdId = celebrate({
  params: Joi.object().keys({
    userId: Joi.string().required().custom((value) => {
      if (isObjectIdOrHexString(value)) {
        return value;
      }
      throw new Error400('Передан некорректный id');
    }),
  }),
});

export const validateCreateUser = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(200),
    avatar: Joi.string().uri(),
  }),
});

export const validateUpdateProfile = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    about: Joi.string().required().min(2).max(200),
  }),
});

export const validateUpdateAvatar = celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().required().uri(),
  }),
});

export const validateLogin = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});
