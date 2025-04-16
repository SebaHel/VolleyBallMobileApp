import express, { Request, Response, NextFunction } from "express";
import { badRequestError } from "../../errors/badRequestError";
import { checkAuth } from "../../models/authCheck";
import { findGroupById, isCoachofGroup } from "../../models/group";
import { findUserByEmail, findUserById } from "../../models/user";
import { addInviteNotification } from "../../models/notification";

const router = express.Router();

router.post(
  "/api/group/addGroupMemberNotification",
  async (req: Request, res: Response, next: NextFunction) => {
    const { token, memberEmail, group_id } = req.body;
    if (!token || !memberEmail || !group_id) {
      return next(new badRequestError("Bad Request Error"));
    }

    const response = await checkAuth(token);
    const existingUser = await findUserByEmail(memberEmail);
    if (!response || !existingUser) {
      next(new badRequestError("Bad Request Error"));
    } else {
      const isAuthorized = await isCoachofGroup(response.id, group_id);
      const CoachEmail = await findUserById(response.id);
      const groupName = await findGroupById(group_id);
      if (!isAuthorized) {
        return next(new badRequestError("Bad Request Error"));
      } else {
        await addInviteNotification(
          existingUser.id,
          "invite",
          "You were invited to group",
          { Name: groupName?.name, InvitedBy: CoachEmail?.email }
        );
        res.status(201).send("user Added");
      }
    }
  }
);

export { router as addGroupMemberNotification };
