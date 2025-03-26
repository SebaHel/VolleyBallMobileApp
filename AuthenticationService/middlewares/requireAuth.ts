import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { findUserById } from "../models/user";

interface UserPayload {
  id: string;
  email: string;
}

declare global {
  namespace Express {
    interface Request {
      user?: UserPayload | null;
    }
  }
}

export const requireAuth = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return next();
  }

  const token = authorization.replace("Bearer", "").trim();
  jwt.verify(token, String(process.env.JWTKEY), async (err, payload) => {
    if (err) {
      next(res.status(401).send({ error: "You Must be logged in." }));
    }
    if (!payload) {
      next(res.status(401).send({ error: "You Must be logged in." }));
    }
    const { userId }: any = payload;
    const user = await findUserById(userId);

    req.user = user;
    next();
  });
};
