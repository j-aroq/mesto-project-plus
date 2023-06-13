import { Request, Response, NextFunction } from 'express';
// eslint-disable-next-line import/no-extraneous-dependencies
import { isCelebrateError } from 'celebrate';

export default function celebrateErrorHandler(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction,
) {
  if (isCelebrateError(err)) {
    return res.status(400).json({ message: err.message });
  }
  return next(err);
}
