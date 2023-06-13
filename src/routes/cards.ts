import { Router } from 'express';
import {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
} from '../controllers/cards';
import { validateCardId, validateCreateCard } from '../validation/card';

export default Router()
  .get('/', getCards)
  .post('/', validateCreateCard, createCard)
  .delete('/:cardId', validateCardId, deleteCard)
  .put('/:cardId/likes', validateCardId, likeCard)
  .delete('/:cardId/likes', validateCardId, dislikeCard);
