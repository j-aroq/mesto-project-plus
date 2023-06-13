import { statusCode403 } from '../constants/status';

export default class Error403 extends Error {
  statusCode: number;

  constructor(message: string) {
    super(message);
    this.statusCode = statusCode403;
  }
}
