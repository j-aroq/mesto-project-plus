import { Router } from 'express';
import {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
} from '../controllers/cards';

export default Router()
  .get('/', getCards)
  .post('/', createCard)
  .delete('/:cardId', deleteCard)
  .put('/:cardId/likes', likeCard)
  .delete('/:cardId/likes', dislikeCard);
