import { Request, Response, NextFunction } from "express";
import { CustomError } from "../errors/custom-error";

export const errorHandler = (
  err: Error | CustomError,
  req: Request,
  res: Response,
  next: NextFunction
): any => {
  if (err instanceof CustomError) {
    return res.status(err.statusCode).send({ errors: err.serializeError() });
  }

  console.error("Unexpected error:", err);
  res.status(500).send({
    errors: [{ message: "Something went wrong" }],
  });
  return;
};
