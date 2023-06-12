/* eslint-disable no-unused-vars */
// eslint-disable-next-line import/no-extraneous-dependencies
import { JwtPayload } from 'jsonwebtoken';
import { Request } from 'express';
import { ObjectId } from 'mongoose';

export interface IUserRequest extends Request {
  user?: JwtPayload | string;
}

export interface IUserIdRequest extends Request {
  _id: ObjectId | string;
}
