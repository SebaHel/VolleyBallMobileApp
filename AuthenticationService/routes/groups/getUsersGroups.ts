import express, { Request, Response, NextFunction } from "express";
import { badRequestError } from "../../errors/badRequestError";
import { checkAuth } from "../../models/authCheck";
import { findAllUserGroups } from "../../models/group";

const router = express.Router();

router.post(
  "/api/groups",
  async (req: Request, res: Response, next: NextFunction) => {
    const { token } = req.body;
    console.log(token);
    if (!token) {
      return next(new badRequestError("Bad Request Error"));
    }

    const response = await checkAuth(token);
    if (!response) {
      next(new badRequestError("Bad Request Error"));
    } else {
      const userId = response.id;
      const userGroups = await findAllUserGroups(userId);
      res.status(201).send({ userGroups });
    }
  }
);

export { router as getUserGroups };
