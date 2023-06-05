import { Router } from "express";
import {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
} from "../controllers/cards";

const router = Router();

export const cardsRouter = router.get("/", getCards);
export const newCardRouter = router.post("/", createCard);
export const cardRemovalRouter = router.delete("/:cardId", deleteCard);
export const cardLikeRouter = router.put("/:cardId/likes", likeCard);
export const cardDislikeRouter = router.delete("/:cardId/likes", dislikeCard);
