import express, { Request, Response, NextFunction } from "express";
import { badRequestError } from "../../errors/badRequestError";
import { findAllGroupMembers } from "../../models/group";

const router = express.Router();

router.get(
  "/api/group/members",
  async (req: Request, res: Response, next: NextFunction) => {
    const { group_id } = req.body;
    console.log(group_id);
    if (!group_id) {
      return next(new badRequestError("Bad request Error"));
    }
    const response = await findAllGroupMembers(group_id);
    res.status(201).send({ response });
  }
);
export { router as getGroupMembers };
