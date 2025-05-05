import express, { NextFunction, Request, Response } from "express";
import { checkAuth } from "../../models/authCheck";
import { badRequestError } from "../../errors/badRequestError";
import { CreateUserProfile } from "../../models/user_profile";

const router = express.Router();

router.post(
  "/api/profile/createProfile",
  async (req: Request, res: Response, next: NextFunction) => {
    const { token, name, surname, position } = req.body;
    if (!token || !name || !surname || !position) {
      return next(new Error("Not Provided Valid Credentials"));
    }
    const response = await checkAuth(token);

    if (!response) {
      next(new badRequestError("Bad Request Error"));
    } else {
      const user_id = response.id;
      await CreateUserProfile(user_id, name, surname, position);
      res.status(201).send({ Message: "Succesfully created" });
    }
  }
);

export { router as createProfile };
