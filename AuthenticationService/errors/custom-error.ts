export abstract class CustomError extends Error {
  abstract statusCode: number;
  message: string;

  constructor(message: string) {
    super(message);
    Object.setPrototypeOf(this, new.target.prototype);
    this.message = message;

    Error.captureStackTrace(this);
  }

  abstract serializeError(): {
    message: string;
    field?: string;
  }[];
}
