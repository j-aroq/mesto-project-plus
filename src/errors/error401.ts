import { statusCode401 } from '../constants/status';

export default class Error401 extends Error {
  statusCode: number;

  constructor(message: string) {
    super(message);
    this.statusCode = statusCode401;
  }
}
