import { CustomError } from "./custom-error";

export class badRequestError extends CustomError {
  statusCode = 400;

  constructor(public message: string) {
    super(message);
  }

  serializeError() {
    return [{ message: this.message }];
  }
}
