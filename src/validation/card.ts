// eslint-disable-next-line import/no-extraneous-dependencies
import { celebrate, Joi } from 'celebrate';
import { isObjectIdOrHexString } from 'mongoose';
import Error400 from '../errors/error400';

export const validateCreateCard = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required().uri(),
  }),
});

export const validateCardId = celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().required().custom((value) => {
      if (isObjectIdOrHexString(value)) {
        return value;
      }
      throw new Error400('Передан некорректный id');
    }),
  }),
});
