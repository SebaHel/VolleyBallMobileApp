import express, { Request, Response, NextFunction } from "express";
import { badRequestError } from "../../errors/badRequestError";
import { deleteNotification } from "../../models/notification";

const router = express.Router();

router.delete(
  "/api/Notifications/deleteNotification",
  async (req: Request, res: Response, next: NextFunction) => {
    const { notification_id } = req.body;

    if (!notification_id) {
      next(new badRequestError("bad request error"));
    } else {
      await deleteNotification(notification_id);
      res.status(200).send("Successfully deleted");
    }
  }
);

export { router as deleteNotificationRouter };
