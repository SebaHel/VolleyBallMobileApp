import express, { Request, Response, NextFunction } from "express";
import { badRequestError } from "../../errors/badRequestError";
import { checkAuth } from "../../models/authCheck";
import { findAllUserNotifications } from "../../models/notification";

const router = express.Router();

router.post(
  "/api/notifications",
  async (req: Request, res: Response, next: NextFunction) => {
    const { token } = req.body;
    if (!token) {
      return next(new badRequestError("Bad Request Error"));
    }

    const response = await checkAuth(token);
    if (!response) {
      next(new badRequestError("Bad Request Error"));
    } else {
      const userId = response.id;
      const userNotifications = await findAllUserNotifications(userId);
      res.status(201).send({ userNotifications });
    }
  }
);

export { router as getUserNotifications };
