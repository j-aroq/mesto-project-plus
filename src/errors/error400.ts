import { statusCode400 } from '../constants/status';

export default class Error400 extends Error {
  statusCode: number;

  constructor(message: string) {
    super(message);
    this.statusCode = statusCode400;
  }
}
