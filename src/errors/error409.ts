import { statusCode409 } from '../constants/status';

export default class Error409 extends Error {
  statusCode: number;

  constructor(message: string) {
    super(message);
    this.statusCode = statusCode409;
  }
}
