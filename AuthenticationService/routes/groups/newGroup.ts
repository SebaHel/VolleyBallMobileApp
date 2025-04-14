import express, { Request, Response, NextFunction } from "express";
import { badRequestError } from "../../errors/badRequestError";
import { checkAuth } from "../../models/authCheck";
import { addGroup, addGroupMember } from "../../models/group";

const router = express.Router();

router.post(
  "/api/group/addGroup",
  async (req: Request, res: Response, next: NextFunction) => {
    const { token, groupName } = req.body;
    if (!token || !groupName) {
      return next(new badRequestError("Bad Request Error"));
    }

    const response = await checkAuth(token);
    const groupId = await addGroup(groupName);
    if (!response || !groupId) {
      console.log(response, groupId);
      next(new badRequestError("Bad Request Error"));
    } else {
      const userId = response.id;
      addGroupMember(groupId.id, userId, "coach");
      res.status(201).send({ groupId });
    }
  }
);

export { router as newGroupRouter };
